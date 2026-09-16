# Apache Spark ile Dağıtık Sistemlerde Performans Optimizasyonu

*Yazar: Sümeyra Altaş | Tarih: 18 Mayıs 2024 | Kategori: Büyük Veri & Dağıtık Sistemler*

Büyük ölçekli veri mühendisliği ve dağıtık hesaplama projelerinde **Apache Spark**, esnek yapısı ve in-memory (bellek içi) hesaplama kabiliyetiyle endüstri standardı haline gelmiştir. Ancak devasa veri kümeleri üzerinde çalışırken yanlış konfigürasyonlar veya bilinçsiz yazılmış transformasyonlar (transformations) ciddi darboğazlara ve Out-Of-Memory (OOM) hatalarına yol açabilir.

Bu yazıda, açık kaynak kodlu Apache Spark geliştirmelerinde ve büyük ölçekli mimarilerde edindiğim performans optimizasyon tekniklerini derledim.

---

### 1. Shuffle Operasyonlarını Minimize Edin

Spark mimarisinde en maliyetli işlemler ağ üzerinden veri transferini gerektiren **Shuffle** operasyonlarıdır:
- `groupByKey` yerine her zaman `reduceByKey` veya `aggregateByKey` tercih edilmelidir. `groupByKey` tüm anahtar-değer çiftlerini ağ üzerinden aktarırken, `reduceByKey` veriyi önce map aşamasında (in-node) birleştirerek ağ trafiğini dramatik şekilde düşürür.
- Gereksiz `repartition()` çağrılarından kaçının. Eğer hedef sadece partition sayısını azaltmaksa, tam bir shuffle gerektirmeyen `coalesce()` fonksiyonunu kullanın.

```scala
// Öneri: groupByKey yerine reduceByKey kullanımı
val counts = textRDD
  .flatMap(line => line.split(" "))
  .map(word => (word, 1))
  .reduceByKey(_ + _) // Mapper tarafında local aggregation yapar
```

---

### 2. Broadcast Join ile Ağ Yükünden Kurtulun

Büyük bir tablo ile görece küçük bir referans tablosunu (örneğin 10-100 MB arası) join ederken standart `SortMergeJoin` yerine **Broadcast Join** kullanmak performansı katlar:

```scala
import org.apache.spark.sql.functions.broadcast

val largeDF = spark.read.parquet("hdfs:///data/transactions")
val smallDF = spark.read.parquet("hdfs:///data/categories")

// smallDF tüm executor'ların belleğine kopyalanır, shuffle gerekmez
val joinedDF = largeDF.join(broadcast(smallDF), "categoryId")
```

Bu sayede devasa işlem hacmine sahip veriler üzerinde gereksiz hash ve sorting operasyonları engellenir.

---

### 3. Data Skew (Veri Dengesizliği) ile Mücadele: Salting Tekniği

Dağıtık sistemlerin en sinsi sorunlarından biri **data skew**'dur. Belirli bir partition'a aşırı miktarda veri düşmesi, diğer tüm core'lar boştayken tek bir executor'ın saatlerce takılmasına sebep olur.

Bu problemi çözmek için:
- **Salting (Tuzlama)** tekniği ile anahtar değerlerine rastgele bir ön ek (örneğin `1` ile `10` arasında) eklenerek verinin birden fazla partition'a homojen dağılması sağlanabilir.
- Spark 3.0 ile gelen **AQE (Adaptive Query Execution)** özelliğini aktif hale getirin:
  ```properties
  spark.sql.adaptive.enabled = true
  spark.sql.adaptive.skewJoin.enabled = true
  ```

---

### 4. Bellek Yönetimi ve Kryo Serializer

Varsayılan Java serializer yerine **KryoSerializer** kullanmak bellek ayak izini %20 ile %40 oranında küçültebilir ve serileştirme süresini hızlandırır:

```scala
val conf = new SparkConf()
  .set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
  .registerKryoClasses(Array(classOf[TransactionRecord]))
```

---

### Sonuç

Apache Spark üzerinde performans artışı elde etmek tek bir "sihirli bayrak" ile değil; doğru partitioning, shuffle maliyetlerini öngörme ve executor kaynaklarını dengeli kullanma alışkanlığı ile mümkündür. Dağıtık mimarilerde küçük bir optimizasyon bile terabaytlarca veride saatlerce tasarruf sağlayabilir.

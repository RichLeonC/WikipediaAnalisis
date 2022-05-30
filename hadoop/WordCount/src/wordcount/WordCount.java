package wordcount;



import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

// Para que reconozca estos imports hay que referenciarlos en el visual studio
// Hay que importar TODOS los JARs que hay en  C:\hadoop-3.3.2\share\hadoop\mapreduce  y  C:\hadoop-3.3.2\share\hadoop\common

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;



public class WordCount {

    public static class Map extends Mapper<LongWritable, Text, Text, IntWritable>{
        
        // Dentro de este metodo map es donde va la logica para leer
        // context es el output que pasa el map al reduce
        
        public void map(LongWritable key, Text value, Context context)
                throws IOException, InterruptedException {
                
            
         // La idea es agarrar solo los titulos separando por "|" y luego separar cada titulo por ","
            String[] sections = value.toString().split("|");            // separar input por secciones
            String[] titles = Arrays.toString(sections).split(",");     // separar palabras por comas
            
            //HashMap<String, Integer> titleHashMap = new HashMap<>();    
            //Iterator<Entry <String, Integer> > 
                   // mapIterator = titleHashMap.entrySet().iterator();
            
            for (String title : titles) {   // verificar si un titulo del array ya está en el hashmap
                
               /* while (mapIterator.hasNext()) {
                    Entry<String, Integer> entry = mapIterator.next();
                    
                    if (title.equals(entry.getKey())) {
                        entry.setValue(entry.getValue() + 1);
                    }
                }*/
               context.write(new Text(title), new IntWritable(1));
            }           
        }
    }

    public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {
        // Item es una clase que está abajo. Es un objeto que une cada key con su value
        List<Item> itemList = new ArrayList<>();    // Item contiene el titulo y las repeticiones
        
        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            
            int sum = 0;
            for (IntWritable value : values) {
                sum += value.get(); // se supone que aquí suma las repeticiones 
            }
            
            Item item = new Item(key.toString(), sum);
            itemList.add(item);
        }
        
        public void cleanUp(Context context)    // este metodo lo hicieron en el tutorial para ordenar el output pero lo puse de todos modos
                throws IOException, InterruptedException {
            Collections.sort(itemList);
            System.out.println(itemList);
            
            for (Item item : itemList) {
                context.write(new Text(item.getName()),
                        new IntWritable(item.getOccurance()));
            }
        }
  
    }
    
    public static class Item implements Comparable<Item>{
        private String name;
        private int occurance;

        public Item(String name, int occurance) {
            this.name = name;
            this.occurance = occurance;
        }

        public String getName() {
            return name;
        }

        public int getOccurance() {
            return occurance;
        }

        @Override
        public int compareTo(Item item2) {
            return -(this.occurance-item2.occurance);
        }
        
    }

    public static void main(String[] args) throws IOException,
            ClassNotFoundException, InterruptedException {
    /*
        Path input_dir = new Path("hdfs://localhost:9870/user/wikyviky.csv");
        Path output_dir = new Path("hdfs://localhost:9000/user/user_salida/");
        
        Configuration conf = new Configuration();
        Job job = new Job(conf, "WordCount");
        
        job.setJarByClass(WordCount.class);
        job.setMapperClass(Map.class);
        job.setReducerClass(Reduce.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        
        FileInputFormat.addInputPath(job, input_dir);
        FileOutputFormat.setOutputPath(job, output_dir);
        output_dir.getFileSystem(job.getConfiguration()).delete(output_dir, true);
        
        System.exit(job.waitForCompletion(true) ? 0: 1);
        */
        Configuration conf = new Configuration();
        
        Job job = Job.getInstance(conf, "WordCount");
        
        job.setJarByClass(WordCount.class);
        
        job.setMapperClass(Map.class);
        job.setReducerClass(Reduce.class);
        
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        
        job.setInputFormatClass(TextInputFormat.class);
        job.setOutputFormatClass(TextOutputFormat.class);
        
        Path outputPath = new Path(args[1]);
        
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        
        outputPath.getFileSystem(conf).delete(outputPath, true);
        
        System.exit(job.waitForCompletion(true) ? 0: 1);
    }
}

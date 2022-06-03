package wordcount;

import java.io.IOException;
import java.util.StringTokenizer;

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

    public static class Map extends Mapper<LongWritable, Text, Text, IntWritable> {

        // Dentro de este metodo map es donde va la logica para leer
        // context es el output que pasa el map al reduce
        public void map(LongWritable key, Text value, Context context)
                throws IOException, InterruptedException {
            
            // transformar el input a string
            String line = value.toString();
            int finTitulos = line.indexOf("|");
            
            //Titulos        
            String celdaTitulos = line.substring(0, finTitulos); // captura de solo titulos
            StringTokenizer titulos = new StringTokenizer(celdaTitulos, ","); // separador de titulos
                    
            while(titulos.hasMoreTokens()) {    // conteo de titulos
                value.set(titulos.nextToken());
                context.write(value, new IntWritable(1));
            }//hasta aquí solo agarra titulos
/*          
            //Subtitulos
            int inicioSubtitulos = line.indexOf(finTitulos);
            String textoSinTitulos = line.substring(inicioSubtitulos);
            
            int finSubtitulos = textoSinTitulos.indexOf("|");
            String celdaSubtitulos = textoSinTitulos.substring(0, finSubtitulos);
            
            StringTokenizer subtitulos = new StringTokenizer(celdaSubtitulos, ",");
            
            while(subtitulos.hasMoreTokens()) { // conteo de subtitulos
                value.set(subtitulos.nextToken());
                context.write(value, new IntWritable(1));
            }
*/
        }
    }

    public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {

        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {

            int sum = 0;
            for (IntWritable x : values) {
                sum += x.get();
            }
            context.write(key, new IntWritable(sum));
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

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}


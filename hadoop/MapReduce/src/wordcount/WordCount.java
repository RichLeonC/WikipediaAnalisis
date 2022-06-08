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
            
//          //Columna Titulos        
            String celdaTitulos = line.substring(0, finTitulos); // captura de solo titulos
            StringTokenizer titulos = new StringTokenizer(celdaTitulos, ","); // separador de titulos
            int cantidadTotal = 0; // contador de titulos
            while(titulos.hasMoreTokens()) {    // conteo de titulos
                value.set(titulos.nextToken());
                context.write(value, new IntWritable(1));
                cantidadTotal++; //aumenta el contador cada vez que agrega un titulo
           }
            
            context.write(new Text("Cantidad titulos"), new IntWritable(cantidadTotal)); // se agrega el contador
            //Columna Subtitulos
            int finSubtitulos = line.indexOf("|", finTitulos + 1);  // No comentar para que funcionen las demas                   
            String celdaSubtitulos = line.substring(finTitulos, finSubtitulos);
            StringTokenizer subtitulos = new StringTokenizer(celdaSubtitulos, ",");
            
            while(subtitulos.hasMoreTokens()) {
                value.set(subtitulos.nextToken());
                context.write(value, new IntWritable(1));
            }
            
            //Columna Parrafos
            int finParrafos = line.indexOf("|", finSubtitulos + 1); // No comentar para que funcionen las demas
            String celdaParrafos = line.substring(finSubtitulos, finParrafos);
            StringTokenizer parrafos = new StringTokenizer(celdaParrafos, ",");
            
            while(parrafos.hasMoreTokens()) {
                value.set(parrafos.nextToken());
                context.write(value, new IntWritable(1));
            }
            
            //Columna parrafosStemming
            int finParrafosStemming = line.indexOf("|", finParrafos + 1); // No comentar para que funcionen las demas
            String celdaParrafosStemming = line.substring(finParrafos, finParrafosStemming);
            StringTokenizer parrafosStemming = new StringTokenizer(celdaParrafosStemming, ",");
            
            while(parrafosStemming.hasMoreTokens()) {
                value.set(parrafosStemming.nextToken());
                context.write(value, new IntWritable(1));
            }

            //Columna TitulosStemming
            int finTitulosStemming = line.indexOf("|", finParrafosStemming + 1); // No comentar para que funcionen las demas
            String celdaTitulosStemming = line.substring(finParrafosStemming, finTitulosStemming);
            StringTokenizer titulosStemming = new StringTokenizer(celdaTitulosStemming, ",");
            
            while(titulosStemming.hasMoreTokens()) {
                value.set(titulosStemming.nextToken());
                context.write(value, new IntWritable(1));
            }
          
            //Columna SubtitulosStemming
            int finSubtitulosStemming = line.indexOf("|", finTitulosStemming + 1); // No comentar para que funcionen las demas
            String celdaSubtitulosStemming = line.substring(finTitulosStemming, finSubtitulosStemming);
            StringTokenizer subtitulosStemming = new StringTokenizer(celdaSubtitulosStemming, ",");
            
            while(subtitulosStemming.hasMoreTokens()) {
                value.set(subtitulosStemming.nextToken());
                context.write(value, new IntWritable(1));
            }

            //Columna SrcImages
            int finSrcImages = line.indexOf("|", finSubtitulosStemming + 1); // No comentar para que funcionen las demas
            String celdaSrcImages = line.substring(finSubtitulosStemming, finSrcImages);
            StringTokenizer srcImages = new StringTokenizer(celdaSrcImages, ",");
            
            while(srcImages.hasMoreTokens()) {
                value.set(srcImages.nextToken());
                context.write(value, new IntWritable(1));
            }

            //Columna altImages
            int finAltImages = line.indexOf("|", finSrcImages + 1); // No comentar para que funcionen las demas
            String celdaAltImages = line.substring(finSrcImages, finAltImages);
            StringTokenizer altImages = new StringTokenizer(celdaAltImages, ",");
            
            while(altImages.hasMoreTokens()) {
                value.set(altImages.nextToken());
               context.write(value, new IntWritable(1));
            }

            //Columna altImagesStemming
            int finAltImagesStemming = line.indexOf("|", finAltImages + 1); // No comentar para que funcionen las demas
            String celdaAltImagesStemming = line.substring(finAltImages, finAltImagesStemming);
            StringTokenizer altImagesStemming = new StringTokenizer(celdaAltImagesStemming, ",");
            
            while(altImagesStemming.hasMoreTokens()) {
                value.set(altImagesStemming.nextToken());
                context.write(value, new IntWritable(1));
            }

            //Columna autores
            int finAutores = line.indexOf("|", finAltImagesStemming + 1); // No comentar para que funcionen las demas
            String celdaAutores = line.substring(finAltImagesStemming, finAutores);
            StringTokenizer autores = new StringTokenizer(celdaAutores, ",");
            
            while(autores.hasMoreTokens()) {
                value.set(autores.nextToken());
                context.write(value, new IntWritable(1));
            }

            //Columna referencias
            int finReferencias = line.indexOf("|", finAutores + 1); // No comentar para que funcionen las demas
            String celdaReferencias = line.substring(finAutores, finReferencias);
            StringTokenizer referencias = new StringTokenizer(celdaReferencias, ",");
            
            while(referencias.hasMoreTokens()) {
                value.set(referencias.nextToken());
                context.write(value, new IntWritable(1));
            }
            
            //Columna Links (aquí no se necesita un index "finLinks porque ya solo debe seguir hasta que se acabe el texto
            String celdaLinks = line.substring(finReferencias);
            StringTokenizer links = new StringTokenizer(celdaLinks, ",");
            
            while(links.hasMoreTokens()) {
                value.set(links.nextToken());
                context.write(value, new IntWritable(1));
            }
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


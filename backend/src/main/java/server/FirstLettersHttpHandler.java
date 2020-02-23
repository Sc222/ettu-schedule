package server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpPrincipal;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.util.Collections;

public class FirstLettersHttpHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private static void handleRequest(HttpExchange httpExchange) throws IOException {
        printRequestInfo(httpExchange);
        String result = getEttuFirstLettersData();
        URI requestURI = httpExchange.getRequestURI();
        String response = "This is the response at " + requestURI+"\nTransport stops first symbols\n"+result;
        Headers headers = httpExchange.getResponseHeaders();
        //headers.add("Content-Type","application/json; charset=utf-8");
        headers.add("Content-Type","text/html; charset=utf-8");
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        //httpExchange
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private static String getEttuFirstLettersData() throws IOException {
        Document doc = Jsoup.connect("http://online.ettu.ru/").get();
        return String.join("\n",doc.getElementsByClass("letter-link").eachText());
    }

    private static void printRequestInfo(HttpExchange exchange) {
        System.out.println("-- headers --");
        Headers requestHeaders = exchange.getRequestHeaders();
        requestHeaders.entrySet().forEach(System.out::println);

        System.out.println("-- principle --");
        HttpPrincipal principal = exchange.getPrincipal();
        System.out.println(principal);

        System.out.println("-- HTTP method --");
        String requestMethod = exchange.getRequestMethod();
        System.out.println(requestMethod);

        System.out.println("-- query --");
        URI requestURI = exchange.getRequestURI();
        String query = requestURI.getQuery();
        System.out.println(query);
    }
}



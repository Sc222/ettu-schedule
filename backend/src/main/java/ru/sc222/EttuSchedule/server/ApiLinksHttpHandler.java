package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

public class ApiLinksHttpHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private static void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = generateApiLinksPage();
        URI requestURI = httpExchange.getRequestURI();
        String response = "This is the response at " + requestURI+"<br>All Api links:"+result;
        Headers headers = httpExchange.getResponseHeaders();
        //headers.add("Content-Type","application/json; charset=utf-8");
        headers.add("Access-Control-Allow-Origin","http://localhost");
        headers.add("Content-Type","text/html; charset=utf-8");
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        //httpExchange
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private static String generateApiLinksPage() {
        StringBuilder result = new StringBuilder();
        result.append(generateLink("/tram-stops","Tram stops"));
        result.append(generateLink("/trolley-stops","Trolley stops"));
        result.append(generateLink("/transport-near-stops","Transport near stops (pass stop id as /%id%)"));
        return result.toString();
    }

    private static String generateLink(String link, String name) {
        return String.format("<br><a href = \"%s\">%s</a>", link, name);
    }

   /* private static String getEttuFirstLettersData() throws IOException {
        Document doc = Jsoup.connect("http://online.ettu.ru/").get();
        return String.join("\n",doc.getElementsByClass("letter-link").eachText());
    }*/

    /*private static void printRequestInfo(HttpExchange exchange) {
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
    }*/
}



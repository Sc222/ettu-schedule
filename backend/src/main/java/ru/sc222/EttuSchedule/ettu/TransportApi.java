package ru.sc222.EttuSchedule.ettu;

import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;

public interface TransportApi {
    String getTramStops() throws IOException;
    String getTrolleyStops() throws IOException;
    ArrayNode getTramsNearStop(int stopId);
    ArrayNode getTrolleysNearStop(int stopId);
}

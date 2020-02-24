package ru.sc222.EttuSchedule.ettu;

import java.io.IOException;

public interface TransportApi {
    String getTramStops() throws IOException;
    String getTrolleyStops() throws IOException;
    String getTransportNearStop(int stopId) throws IOException;
}

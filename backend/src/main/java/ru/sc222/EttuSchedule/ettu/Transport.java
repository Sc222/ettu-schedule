package ru.sc222.EttuSchedule.ettu;

public class Transport {
    public int id;
    public String nameWithDirection;

    public Transport(int id, String name, String direction) {
        this.id = id;
        nameWithDirection = generateNameWithDirection(name, direction);
    }

    private String generateNameWithDirection(String name, String direction) {
        if (name == null)
            name = "";
        StringBuilder result = new StringBuilder(name);
        if (direction != null && !direction.isEmpty())
            result.append(" (").append(direction).append(")");
        return result.toString();
    }
}

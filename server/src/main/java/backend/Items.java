package backend;

public class Items{
    
    private String name;
    private String description;
    private String icon;
    
    public Items(String name, String description, String icon){

        this.name = name;
        this.description = description;
        this.icon = icon;

    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getIcon() {
        return icon;
    }
    
}
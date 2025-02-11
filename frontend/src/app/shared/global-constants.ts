
export class GlobalConstants{
    
    //Message
    public static genericError:string = "Something went wrong. Please try again later";
    public static unauthorized: string = "You are not authorized person to access this page.";

    public static productExist: string = "Product Already exist";

    public static productAdded:string = "Product Added Successfully"
    //Regex
    public static nameRegex:string = "[a-zA-Z0-9 ]*";
    // public static emailRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static emailRegex:string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    public static contactNumberRegex:string = "^[0-9]{10,10}$";

    //variable 
    public static error:string = "error";
}
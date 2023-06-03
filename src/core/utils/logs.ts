const logger = (
    message: string,
    type: "error" | "warning" | "info" = "info",
    ...data: any[]
): void => {
    if (process.env.NODE_ENV === "development") {
        switch (type) {
            case "error":
                console.error(message, ...data);
                break;
            case "warning":
                console.warn(message, ...data);
                break;
            case "info":
                console.log(message, ...data);
                break;
            default:
                console.log(message, ...data);
        }
    }
};

export default logger;

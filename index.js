import app from "./app.js";
import { PORT, FRONTEND_URL } from "./config.js"
import { connectDB } from "./db.js";


async function main() {
    try {
        await connectDB();
        app.listen(PORT);
        console.log(`Escuchando el puerto ${PORT}`);
        console.log(`Ambiente: ${process.env.NODE_ENV}`); 
    } catch (error) {
        console.log(error)
    };
};

main(); // Llama a la función principal
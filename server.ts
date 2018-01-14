import { Server }  from "./createServer";
import * as hapi from "hapi";

Server((err: string, server: hapi.Server) => {
    
    if (err) {
        throw err;
    }
    server.start(() => {

        console.log('Started the plot device on port 5000, documentation on port 5001/documentation');
    });
});

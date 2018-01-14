'use strict';

import * as Glue from "glue";
import * as Manifest from "./manifest";

export const Server = Glue.compose.bind(Glue, Manifest.get('/'));

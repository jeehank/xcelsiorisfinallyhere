<<<<<<< HEAD
import { auth } from "../../../../lib/auth";
=======
import { auth } from '../../../../lib/auth'; // path to your auth file
>>>>>>> auth
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
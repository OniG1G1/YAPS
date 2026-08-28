import path from "node:path";
import { fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_ROOT = path.join(PROJECT_ROOT, "public");

const VIEWS_ROOT = path.join(PROJECT_ROOT, "src","views");
const PORT = 3000;

const ACCOUNTS_FILE = path.join(
    PROJECT_ROOT,
    "data",
    "mockAccounts.json"
);

export { PROJECT_ROOT, VIEWS_ROOT, PUBLIC_ROOT, PORT, ACCOUNTS_FILE};
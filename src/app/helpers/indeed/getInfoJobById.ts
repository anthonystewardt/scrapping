import puppeteer from "puppeteer";
import { separateName } from "../convertName";

// await scrapeIndeed('indeed', 0, '.jobTitle', 'call center', 'california');
interface Props {
  url: string
}

async function scrapeIndeedById({
  url,
}: Props) {
  const browser = await puppeteer.launch({ headless: true }); // Puedes cambiar a 'false' si quieres ver la ventana del navegador.
  const page = await browser.newPage();
  // Configurar un User-Agent para simular un navegador real
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36"
  );

  try {
   

    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Esperar a que aparezca un elemento específico en la página
    await page.waitForSelector(".jobsearch-JobInfoHeader-title");

    // Obtener el contenido HTML de la página
    const htmlContent = await page.content();

    // const title = await page.$eval('.jobTitle', element => element.textContent);
    const classIndeedTitle = ".jobsearch-JobInfoHeader-title";
    // const classIndeedTitle = ".jobTitle";

    // traer todos los titilos de los trabajos
    const titles = await page.$$eval(
      classIndeedTitle,
      (elements) => elements.map((element) => element.textContent)
    );
   
    return titles;

    // Aquí puedes continuar con el procesamiento del contenido HTML como desees
  } catch (error) {
    console.error("Error al cargar la página:", error);
  } finally {
    await browser.close();
  }
}

export default scrapeIndeedById;

import puppeteer from "puppeteer";
import { separateName } from "../convertName";

// await scrapeIndeed('indeed', 0, '.jobTitle', 'call center', 'california'); 
interface Props {
  websiteName: string;
  pageNumber: number;
  className: string;
  namePosition: string;
  location: string;
}



async function scrapeIndeed({ websiteName, pageNumber, className, namePosition, location}: Props) {
  const browser = await puppeteer.launch({ headless: true }); // Puedes cambiar a 'false' si quieres ver la ventana del navegador.
  const page = await browser.newPage();
  // convertir el namePosition a un string que pueda ser usado en la url por ejemplo: "software developer" -> "software+developer"
  const namePositionUrl = separateName(namePosition);
  const nameLocationUrl = separateName(location);
  // convertir el location a un string que pueda ser usado en la url por ejemplo: "New York" -> "new+york" o si es lima un lugar sin espacio dejarlo como esta

  const paths = {
    indeed: {
      url: `https://www.indeed.com/jobs?q=${namePositionUrl}&l=${nameLocationUrl}&radius=50&start=${pageNumber}&vjk=2c898d9c4eed7c64`,
      classTitle: ".jobTitle",
      classIdJob: ".jcs-JobTitle",
    },
    // https://www.ziprecruiter.com/jobs-search?location=Miami%2C+FL&search=call+center&lvk=&page=2&impression_superset_id=CFRAY%3A86e1aaf308e4951c-IAD
    zip: {
      url: `https://www.ziprecruiter.com/jobs-search?location=${nameLocationUrl}&search=${namePositionUrl}&lvk=`,
      classTitle: ".job_result_two_pane h2",
      classIdJob: ".job_result_two_pane h2 a",
    },
    // zip: `https://www.ziprecruiter.com/jobs-search?location=${nameLocationUrl}&search=${namePositionUrl}&lvk=`,
  };

  // Configurar un User-Agent para simular un navegador real
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36"
  );

  const urlIndeedJob =
    "https://www.indeed.com/jobs?q=call+center&l=california&vjk=96c07c88281af9e3";
  const urlIndeedJobSecondary = `https://www.indeed.com/jobs?q=${namePositionUrl}&l=${nameLocationUrl}&radius=50&start=${pageNumber}&vjk=2c898d9c4eed7c64`;
  const urlZipJob =
    "https://www.ziprecruiter.com/jobs-search?location=Miami%2C+FL&search=call+center&lvk=";

  try {
    interface Paths {
      [key: string]: {
        url: string;
        classTitle: string;
        classIdJob: string;
      };
    }

    const paths: Paths = {
      indeed: {
        url: `https://www.indeed.com/jobs?q=${namePositionUrl}&l=${nameLocationUrl}&radius=50&start=${pageNumber}&vjk=2c898d9c4eed7c64`,
        classTitle: ".jobTitle",
        classIdJob: ".jcs-JobTitle",
      },
      zip: {
        url: `https://www.ziprecruiter.com/jobs-search?location=${nameLocationUrl}&search=${namePositionUrl}&lvk=`,
        classTitle: ".job_result_two_pane h2",
        classIdJob: ".job_result_two_pane h2 a",
      },
    };

    await page.goto(paths[websiteName].url, { waitUntil: "domcontentloaded" });

    // Esperar a que aparezca un elemento específico en la página
    await page.waitForSelector(paths[websiteName].classTitle);

    // Obtener el contenido HTML de la página
    const htmlContent = await page.content();

    // const title = await page.$eval('.jobTitle', element => element.textContent);
    const classZipTitle = ".job_result_two_pane h2";
    const classIndeedTitle = ".jobTitle";

    // traer todos los titilos de los trabajos
    const titles = await page.$$eval(
      paths[websiteName].classTitle,
      (elements) => elements.map((element) => element.textContent)
    );
    const companyName = await page.$$eval(".company_location", (element) => {
      return element.map((el) => el.textContent);
    })
    let idJob: (string | null)[] = [];
    switch (websiteName) {
      case "indeed":
        idJob = await page.$$eval(paths[websiteName].classIdJob, (element) =>
          element.map((el) => {
            const separateOnlyId = el.getAttribute("id")!.split("_");
            //  const namePositionUrl = separateName(namePosition);
            //  const nameLocationUrl = separateName(location);
            return separateOnlyId[1];
            // https://www.indeed.com/jobs?q=call+center&l=california&vjk=b6847ba3b8fe1752
            // return `https://www.indeed.com/jobs?q=${namePositionUrl}&l=${nameLocationUrl}&vjk=${separateOnlyId[1]}`;
          })
        );
        break;
      case "zip":
        idJob = await page.$$eval(paths[websiteName].classIdJob, (element) =>
          element.map((el) => {
            const separateOnlyId = el.getAttribute("href");
            return separateOnlyId;
          })
        );
      default:
        break;
    }

    console.log({ titles: titles || null, idJob: idJob || "" , companyName});
    // return { titles, idJob: idJob || "" };

    const orderInfo = (titles: any , idJob: (string | null)[], companyName: any) => { 
      const filteredIdJob = idJob.filter((id) => id !== null) as string[];
      const infoJob = titles.map((title: string, index: number ) => {
        return {
          title,
          idJob: filteredIdJob[index],
          companyName: companyName[index],
          url: `https://www.indeed.com/viewjob?jk=${filteredIdJob[index]}&tk=1ht7a6mmekhpd88l&from=serp&vjs=3`,
        };
      });
      return infoJob;
    }

    return orderInfo(titles, idJob, companyName);
    // Aquí puedes continuar con el procesamiento del contenido HTML como desees
  } catch (error) {
    console.error("Error al cargar la página:", error);
  } finally {
    await browser.close();
  }
}

export default scrapeIndeed;

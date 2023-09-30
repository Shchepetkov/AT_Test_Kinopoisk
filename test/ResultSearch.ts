import {AbstractPage} from './AbstractPage';
import {By} from "selenium-webdriver";
import {assert} from "chai";


export class ResultSearch extends AbstractPage {

    private locatorListOfFilms: By = By.xpath("//td[@id = 'block_left_pad']//child::div[@class = 'element']/child::span[text() = " +
        "'" + this.countSearchFilms + "']/preceding::div[@class = 'info']/p[@class = 'name']/a[contains(text(), '" + this.shortNameFilm + "')]");
    private locatorListOfRating: By = By.xpath("//td[@id = 'block_left_pad']//child::div[@class = 'element']/child::span[text() = " +
        "'" + this.countSearchFilms + "']/preceding::div[@class = 'info']/preceding::div[@class = 'right']/div");

    private filmsNameAndRating: Map<string, number> = new Map<string, number>();

    async getFilmsAndRating(): Promise<void> {
        let listFilms = await this.driver.findElements(this.locatorListOfFilms);
        let rating = await this.driver.findElements(this.locatorListOfRating);

        for (let index in listFilms) {
            let grade = Number(await rating[index].getText());
            let filmName = await listFilms[index].getText();

            this.filmsNameAndRating.set(filmName, grade);
        }
    }

    async checkNameFilm(whatMovie: string): Promise<void> {
        if (this.filmsNameAndRating.get(whatMovie) == null) {
            await assert.ok(false, "В данном списке фильм с именем: \"" + whatMovie + "\" не найден")
        }
    }

    async checkRatingFilm(whatMovie: string, whatGrade: number): Promise<void> {
        await this.checkNameFilm(whatMovie);
        if (Number(this.filmsNameAndRating.get(whatMovie)) < whatGrade) {
            await assert.ok(false, "В данном списке фильм с именем: \"" + whatMovie + "\" имеется, но его рейтингом " + this.filmsNameAndRating.get(whatMovie))
        }
    }
}
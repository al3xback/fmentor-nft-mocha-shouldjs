import should from 'should';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-mocha-shouldjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have header, main, and footer elements', () => {
		const headerEl = document.querySelector('header');
		const mainEl = document.querySelector('main');
		const footerEl = document.querySelector('footer');

		should.exist(headerEl);
		should.exist(mainEl);
		should.exist(footerEl);
	});

	it('should have one direct child of main element', () => {
		const mainEl = document.querySelector('main');
		const mainChildren = Array.from(mainEl.children);

		mainChildren.should.have.length(1);
	});

	it('should have an Equilibrium ID which value is not more than 4000', () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardTitleText = cardTitleEl.textContent.trim();
		const equilibriumIdPos = cardTitleText.indexOf('#') + 1;
		const equilibriumId = cardTitleText.substring(equilibriumIdPos);

		equilibriumId.should.be.within(0, 4000);
	});

	it("should have elements with class of 'card__image' and 'card__content'", () => {
		const cardEl = document.querySelector('.card');
		const isCardImageElExist = !!cardEl.querySelector('.card__image');
		const isCardContentElExist = !!cardEl.querySelector('.card__content');

		isCardImageElExist.should.be.true();
		isCardContentElExist.should.be.true();
	});

	it("should have a certain amount of Ethereum that ends with 'ETH'", () => {
		const iconEthereumEl = document.querySelector('.icon-ethereum');
		const ethereumAmount = iconEthereumEl.nextElementSibling.textContent;
		const ethereumAmountCurrency = ethereumAmount.split(' ')[1];

		ethereumAmountCurrency.should.endWith('ETH');
	});

	it('should have more than one day of remaining time', () => {
		const iconClockEl = document.querySelector('.icon-clock');
		const remainingTime = iconClockEl.nextElementSibling.textContent;
		const remainingTimeNumber = remainingTime.split(' ')[0];

		remainingTimeNumber.should.be.above(1);
	});
});

window.localStorage.removeItem('to_do_tasks')

var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth;


class StarRating {
    constructor(ratingSelector, {
        ratingId,
        userRating,
        averageRating,
        userRatingValueInputSelector,
        averageRatingValueInputSelector,
        raitingSelectedCallback
    }) {
        this.ratingSelector = ratingSelector;
        this.ratingContainer = document.querySelector(ratingSelector);

        this.ratingId = ratingId
        this.averageRating = averageRating;
        this.initialAverageRating = averageRating;
        this.userRating = userRating;


        this.userRatingValueInputSelector = userRatingValueInputSelector
        if(userRatingValueInputSelector) {
            this.userRatingValueInput = document.querySelector(this.userRatingValueInputSelector)
            if (this.userRating) {
                this.setUserInputRating(this.userRating)
            }
        }
        this.averageRatingValueInputSelector = averageRatingValueInputSelector
        if(averageRatingValueInputSelector) {
            this.averageRatingValueInput = document.querySelector(this.averageRatingValueInputSelector);
            if (this.averageRating) {
                this.setAverageInputRating(this.averageRating)
            }
        }

        this.raitingSelectedCallback = raitingSelectedCallback
        this.starButtons = [];

        this.addRating(5);

        if (this.averageRating)  this.showRating()
    }

    setUserInputRating = (v) => {
        this.userRatingValueInput.value = v
    }
    setAverageInputRating = (v) => {
        this.averageRatingValueInput.value = v
    }

    addRating = (starNum) => {

        this.numStars = starNum;

        [...Array(this.numStars).keys()].forEach( i => {
            const starNumber = i + 1; // liczone od 1 
 
            const starButton = this.generateStar(starNumber);
            this.ratingContainer.appendChild(starButton);

            this.starButtons[i] = starButton;
        })

    }

    generateStar = (starNum) => {
        const button = document.createElement("button");
        button.classList.add("button-rating");

        const i = document.createElement("i");
        i.classList.add("fa", "fa-star")
        button.appendChild(i)

        button.addEventListener("mouseover", 
            () => this.showRatingOnMouseOver(button, starNum))

        button.addEventListener("mouseout", 
            () => this.clearRatingOnMouseOut(button, starNum))
    
        button.addEventListener("click", 
            () => this.starClick(button, starNum))
    
        return button;
        
        }

    starClick = (button, starNum) => {
        this.userRating = starNum;

        this.setUserInputRating(this.userRating);

        if(this.raitingSelectedCallback) {
            this.raitingSelectedCallback(
                this.userRating,
                (newAverageRating) => this.setAverageRating(newAverageRating)
            );
        }
    }
    
    setAverageRating = (newAverageRating) => {     
        
        this.averageRating = newAverageRating
        this.setAverageInputRating(this.averageRating)
        this.showRating();
    }

    showRatingOnMouseOver = (button, starNum) => {
        this.clearRating();
        this.starButtons.forEach((b, index)=> {
            if (index < starNum) b.classList.add('star')
        })
    }

    clearRatingOnMouseOut = (button, starNum) => {
        this.showRating();
    }

    clearRating = () => {
        this.starButtons.forEach(b => {
            b.classList.remove("star");
            b.classList.remove("partial-star");
        })
    }

    showRating = () => {
        if (!this.averageRating) return;

        this.starButtons.forEach( (b, index) => {
            if(index  < Math.floor(this.averageRating))  b.classList.add("star");
        })
    
    this.showLastPartialStar();
    
    }


    showLastPartialStar = () => {

        const raiting = Math.abs(this.averageRating) - Math.floor(this.averageRating)
        const ratingStarWitdth = (raiting.toFixed(2) * 100) + "%";

        const partialStarIndex = Math.ceil(this.averageRating) - 1;
        const partialStarButton = this.starButtons[partialStarIndex]; 

        partialStarButton.classList.add("partial-star");
        document.documentElement.style.setProperty("--partial-rating-width", ratingStarWitdth)

    }

}

if (localStorage.length <= 0) {
    localStorage.setItem("V"+today, 1)
}


avarageSoccer = 0
for (let i = 0; i < localStorage.length; i++){
    avarageSoccer += Number(localStorage.getItem(localStorage.key(i)))
    if (i == localStorage.length - 1) {
        voices = (avarageSoccer / i + 1)
    }}

const starRating = new StarRating('#article-1-rating', {
    ratingId: "article-1",
    userRating: null,
    averageRating: voices,
    userRatingValueInputSelector: "#article-1-user-rating-input",
    averageRatingValueInputSelector: "#article-1-average-rating-input",
    raitingSelectedCallback: (rating, setAverageCallback) => {
            console.log("User rating:", rating)
            setAverageCallback(rating);
            localStorage.setItem("V"+today, rating)
    }

});

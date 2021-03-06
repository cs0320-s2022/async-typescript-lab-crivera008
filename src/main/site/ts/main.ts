const suggestions: HTMLUListElement = document.getElementById("suggestions") as HTMLUListElement

const sun: HTMLSelectElement = document.getElementById("sun") as HTMLSelectElement
sun.addEventListener('change', () => postAndUpdate());
const moon: HTMLSelectElement = document.getElementById("moon") as HTMLSelectElement
moon.addEventListener('change', () => postAndUpdate());
const rising: HTMLSelectElement = document.getElementById("rising") as HTMLSelectElement
rising.addEventListener('change', () => postAndUpdate());

type MatchesRequestData = {
    sun: string,
    moon: string,
    rising: string,
}

type Matches = {
    matches: string[];
}

function postAndUpdate(): void {
    suggestions.innerHTML = "";
    const postParameters: MatchesRequestData = {
        sun: sun.value,
        moon: moon.value,
        rising: rising.value
    };

    console.log(postParameters)

    // TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!
    fetch("http://localhost:4567/results", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(postParameters)
    })
        .then(response => response.json())
        .then((json: Matches) => updateSuggestions(json.matches))
        .catch((error: any) => console.error("Error:", error))

    // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
    //  Parse the JSON in the response object
    //  HINT: remember to get the specific field in the JSON you want to use
}

function updateSuggestions(matches: string[]): void {
    matches.forEach(function (value) {
        suggestions.innerHTML += `<li tabindex="0"> ${value} </li>`;
    })
    // TODO: for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
}

// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().

document.addEventListener("keyup", async (event) => {
    if (event.key == "c") {
        await updateValues("Scorpio", "Scorpio", "Sagittarius")
        postAndUpdate()
    }
})

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void> {
    // This line asynchronously waits 1 second before updating the values.
    // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
    await new Promise(resolve => setTimeout(resolve, 1000));

    sun.value = sunval;
    moon.value = moonval;
    rising.value = risingval;
}

export const searchService = {
    search
}

async function search(input) {
    let api = `https://api-demo.sentisum.com/api/v1/comments/textsearch?source=dhl-parcel&terms=${input.input}&sentiment=all&apiKey=AU_WtVnh93Tixe_CNZqp`;
    let response = await fetch(api, { method: "GET" });
    console.log(response);
    if(response) {
        let responseJSON = await response.json();
        if(responseJSON.sentences) {
            return { status: 200, results: responseJSON };
        } else {
            return { status: 404, message: "We couldn't find any response for your input!" };
        }
    } else {
        return { status: 500, message: "The service is currently down. Please try again later." };
    }
}
export default async function validatedList(list) {
    const links = extractLinks(list);
    const status = await checkStatus(links);
    return status;
}

function extractLinks(links) {
    links.map((link) => Object.values(link).join);
}

async function checkStatus(listURLs) {
    const arrStatus = await Promise.all(
        listURLs.map(async (url) => {
            const res = await fetch(url)
            return res.status;
        })
    )
    return arrStatus;
}
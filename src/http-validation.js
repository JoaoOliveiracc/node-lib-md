export default async function validatedList(list) {
    const links = extractLinks(list);
    const status = await checkStatus(links);

    return list.map((object, key) => ({
        ...object,
        status: status[key]
    }))
}

function extractLinks(links) {
    links.map((link) => Object.values(link).join);
}

async function checkStatus(listURLs) {
    const arrStatus = await Promise.all(
        listURLs.map(async (url) => {
            try {
                const res = await fetch(url)
                return res.status;
            } catch (error) {
                return handleError(error);   
            }
        })
    )
    return arrStatus;
}

function handleError(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    } else {
        return 'Ocorreu algum erro';
    }
}
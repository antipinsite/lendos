export default defineEventHandler(async (event) => {
    const params = event.context.params?.path

    const path = Array.isArray(params)
        ? params.join('/')
        : params || ''

    console.log(path, params)

    return await $fetch(`http://localhost:1337/api/${path}`, {
        method: event.method,
        query: getQuery(event),
        body: event.method !== 'GET' ? await readBody(event) : undefined
    })
})
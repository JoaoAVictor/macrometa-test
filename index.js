const jsc8 = require("jsc8");
const client = new jsc8("https://gdn.paas.macrometa.io");

async function main(){
    const keyid="id1";
    await client.login(".git", "xxxxxx");
    // Criando chave da api
    try{
        await client.createApiKey(keyid);
    }
    catch(e){
        console.log('API Creation Failed: ', e);
    }

    //Procurando banco de dados acessiveis
    try{
        var databases = await client.listAccessibleDatabases(keyid)
        console.log("Accessible Databases")
        console.log(databases.result)
    }
    catch(e){
        console.log('Failed to fetch accessible dataases: ', e);

    }
    // Procurando streams acessiveis
    try{
        streams = await client.listAccessibleStreams(keyid, '_system', full=false)
        console.log("Accessible Streams")
        console.log(streams.result)
    }
    catch(e){
        console.log('Failed to fetch accessible streams: ', e);

    }

    // Definindo acessos da API
    // Criando uma Collection
    var coll = await client.getCollections();
    var collectionName = 'testCollection'
    var streamName = 'testStream'
    console.log("Existing Collections: ", coll.result)
    try{
        await client.createCollection(collectionName);
        console.log("Collection Created Successfully")
    }
    catch(e){
        console.log("Collection creation did not succeed due to " + e)
    }
    try{
        await client.setCollectionAccessLevel(keyid, '_system', collectionName, 'rw')
    }
    catch(e){
        console.log("Failed to set Collection Access Level: ",e)
    }
    // Criando stream
    try{
        await client.createStream(streamName)
    }
    catch(e){
        console.log("Stream Creation Failed: ",e)
    }
    try{
        await client.setStreamAccessLevel(keyid, '_system', "c8globals."+streamName, 'ro')
    }
    catch(e){
        console.log("Failed to set Stream Access Level: ",e)
    }
    try{
        await client.setDatabaseAccessLevel(keyid, '_system', 'rw')
    }
    catch(e){
        console.log("Failed to set Database Access Level: ",e)
    }

    // Pegando Acess Level
    try{
        await client.getCollectionAccessLevel(keyid, '_system', collectionName)
    }
    catch(e){
        console.log("Failed to Get Access Level for the Collection: ",e)
    }
    try{
        await client.getStreamAccessLevel(keyid, '_system', "c8globals."+streamName)
    }
    catch(e){
        console.log("Failed to Get Access Level for the Stream: ",e)
    }
    try{
        await client.getDatabaseAccessLevel(keyid, '_system')

    }
    catch(e){
        console.log("Failed to Get Access Level for the Database: ",e)
    }
    // Limpando Access Level
    try{
        await client.clearDatabaseAccessLevel(keyid, '_system')
    }
    catch(e){
        console.log("Clearing Access Level for Database Failed: ",e)
    }
    try{
        await client.clearStreamAccessLevel(keyid, '_system', "c8globals."+streamName)

    }
    catch(e){
        console.log("Clearing Access Level for Stream Failed: ",e)
    }
    try{
        await client.clearCollectionAccessLevel(keyid, '_system', collectionName)
    }
    catch(e){
        console.log("Clearing Access Level for Collection Failed: ",e)

    }
    // removendo a chave da api
    try{
        await client.removeApiKey(keyid);
    }
    catch(e){
        console.log('API Deletion Failed: ', e);

    }
}

main();
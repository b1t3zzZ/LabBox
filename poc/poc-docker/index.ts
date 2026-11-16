//Importation de class docker
import Docker from 'dockerode';

const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function main() {
    //La methode pour afficher toutes les containers
    let containers = await docker.listContainers({ all: true });
    console.log("Nombre de conteneurs actuels :", containers.length);

    console.log("Creation des containers");
    //Creation de Container docker
    const container = await docker.createContainer({
        Image: 'alpine',
        Cmd: ['sleep', '30'],
        name: 'mon-conteneur',
        HostConfig:{
            Memory: 268435456,
            NanoCpus: 500000000,
            PidsLimit: 100
        }
    });
    console.log("Le container a bien créé");

    await container.start();
    console.log("Le container a bien commencé");
    const info = await container.inspect();
    console.log( `Memoire: ${info.HostConfig.Memory}, NanoCpus: ${info.HostConfig.NanoCpus}, PidsLimit: ${info.HostConfig.PidsLimit}` );
    containers = await docker.listContainers({ all: true });
    console.log("Nombre de conteneurs actuels :", containers.length);

    console.log("Le container va être supprimer dans 5 secondes");
    await new Promise(resolve => setTimeout(resolve, 5000));
    await container.stop();
    await container.remove();
    console.log("Le container est supprimé");
}

main();

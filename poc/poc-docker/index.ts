//Importation de class docker
import Docker from 'dockerode';

const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function main() {
    //La methode pour afficher toutes les containers
    const containers = await docker.listContainers({ all: true });
    console.log("Nombre de conteneurs actuels :", containers.length);

    console.log("Creation des containers");
    //Creation de Container docker
    const container = await docker.createContainer({
        Image: 'alpine',
        Cmd: ['sleep', '30'],
        name: 'mon-conteneur'
    });
    console.log("Le container a bien créé");

    await container.start();
    console.log("Le container a bien commencé");
    console.log("Nombre de conteneurs actuels :", containers.length);
}

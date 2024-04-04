// networkStabilization.js

import { Network } from "vis-network";

export function detectNetworkStabilization(network) {

    let isStable = false;
    let stabilizationTimer = null;

    // Add event listener for stabilizationIterationsDone event
    network.on("stabilizationIterationsDone", () => {
        console.log("Network stabilization completed");
        clearTimeout(stabilizationTimer); // Reset timer
        stabilizationTimer = setTimeout(() => {
            console.log("Network has completely stabilized");
            isStable = true;
            network.fit();

        }, 2000); // Adjust timeout duration as needed
    });

    // Function to check if the network has completely stabilized
    function checkStability() {
        if (!isStable) {
            console.log("Network is still stabilizing...");
            // Additional actions you want to perform while the network is stabilizing
        }
    }

    // Check stability periodically
    setInterval(checkStability, 5000); // Adjust interval duration as needed
}

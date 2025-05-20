document.addEventListener("DOMContentLoaded", function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWdyaWJpIiwiYSI6ImNtN2JjZnZlODAzZTEya3M3YXQyd21kNWgifQ.87k1pxDX3IbU4ggaNKENeA';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [30.7333, 46.4667],
        zoom: 12
    });

    new mapboxgl.Marker()
        .setLngLat ([30.7333, 46.4667])
        .setPopup (new mapboxgl.Popup().setHTML('<h3>Smart Transportation</h3><p>Cybersecurity here!</p>'))
        .addTo(map);

});

document.addEventListener("DOMContentLoaded", function() {
    const subtopics = document.querySelectorAll(".subtopic");
    
    subtopics.forEach(subtopic => {
        subtopic.addEventListener("click", function() {
            const targetSection = document.getElementById(subtopic.dataset.target);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const nodes = new vis.DataSet([
        { id: 1, label: 'Set of the topics', title: 'Map of the page', group: 'topic' },
        { id: 2, label: 'Introduction', title: 'Introduction to Cybersecurity', group: 'topic' },
        { id: 3, label: 'Cybersecurity Models', title: 'Cybersecurity Models Overview', group: 'topic' },
        { id: 4, label: 'Security & Privacy', title: 'Security and Privacy in Smart Transport', group: 'topic' },
        { id: 5, label: 'Intelligent Agents', title: 'AI in Cybersecurity Threat Detection', group: 'topic' }
    ]);

    const edges = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 }, 
        { from: 1, to: 5}
    ]);

    const container = document.getElementById('graph-container');
    const data = { nodes, edges };
    const options = {
        nodes: {
            shape: 'circle',
            size: 20,
            font: {
                size: 18,
                face: 'Arial',
            },
            color: {
                background: '#3498db',
                border: '#2980b9',
                highlight: {
                    background: '#1abc9c',
                    border: '#16a085'
                }
            },
            borderWidth: 2,
            shadow: true,
        },
        edges: {
            width: 2,
            length: 250, 
            color: {
                color: '#3498db',
                highlight: '#16a085'
            },
            smooth: {
                type: 'continuous',
                forceDirection: 'none'
            },
        },
        physics: {
            enabled: true, 
            solver: 'repulsion', //що це?
            timestep: 0.35,
            stabilization: true,
        }
    };

    const network = new vis.Network(container, data, options);
    network.on("selectNode", function (event) {
        const nodeId = event.nodes[0];
        const selectedNode = nodes.get(nodeId);
        alert(`You selected node: ${selectedNode.label}`);
        
        const section = document.getElementById(selectedNode.label.toLowerCase().replace(' ', '-'));
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});

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


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".attack-card");
  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease-out";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 200 * index);
  });
});


function runAttack(id, btn) {
  btn.disabled = true;

  if (id === "attack-it") {
    runPhishingDemo(
      document.getElementById(id),
      Array.from(document.querySelectorAll(`#${id} .chain .node`)),
      Array.from(document.querySelectorAll(`#${id} .chain .arrow`)),
      document.querySelector(`#${id} .comment-box`),
      document.getElementById(`full-comment-${id}`),
      btn
    );
  } else if (id === "attack-pipeline") {
    runPipelineDemo(
      document.getElementById(id),
      Array.from(document.querySelectorAll(`#${id} .chain .node`)),
      Array.from(document.querySelectorAll(`#${id} .chain .arrow`)),
      document.querySelector(`#${id} .comment-box`),
      document.getElementById(`full-comment-${id}`),
      btn
    );
  } else if (id === "attack-gps") {
    runGPSDemo(
      document.getElementById(id),
      Array.from(document.querySelectorAll(`#${id} .chain .node`)),
      Array.from(document.querySelectorAll(`#${id} .chain .arrow`)),
      document.querySelector(`#${id} .comment-box`),
      document.getElementById(`full-comment-${id}`),
      btn
    );
  }
}

//
// === QR Phishing Demo ===
//
function runPhishingDemo(container, nodes, arrows, commentBox, fullCommentBox, btn) {
  const messages = [
    "User scans the QR code on the train ticket...",
    "QR code redirects to a fake phishing website...",
    "User enters payment info (masked input)...",
    "Data is stolen by attackers!"
  ];

const fullComment = `In 2022, Deutsche Bahn users were tricked by malicious QR codes on train tickets. Scanning the QR code led to fake phishing sites where payment info was stolen.<br><br>
<strong>Damage:</strong> Financial loss and compromised trust.<br>
<strong>Mitigation:</strong> Verify QR codes, raise user awareness, and enable multi-factor authentication.`;

  const scannerLine = container.querySelector('.scanner-line');
  const qrCode = container.querySelector('.qr-code');
  const loginForm = container.querySelector('.login-form');
  const dataStolenMsg = container.querySelector('.data-stolen-msg');

  // Reset visuals
  nodes.forEach(n => (n.style.opacity = 0.3));
  arrows.forEach(a => (a.style.opacity = 0.3));
  commentBox.textContent = "";
  fullCommentBox.style.display = "none";
  fullCommentBox.textContent = "";
  dataStolenMsg.style.display = "none";

  loginForm.style.color = "#222";
  Array.from(loginForm.querySelectorAll('.masked-input')).forEach(el => {
    el.style.color = "#007bff";
  });

  // Animate steps with timings
  let step = 0;

  function animateStep() {
    if (step === 0) {
      // Highlight User and QR code nodes + animate scanning line top to bottom
      nodes[0].style.opacity = 1; // Train
      nodes[1].style.opacity = 1; // QR Code
      arrows[0].style.opacity = 1;

      // Animate scanner line top to bottom
      scannerLine.style.transition = "transform 2s linear";
      scannerLine.style.transform = "translateY(120px)";

      commentBox.textContent = messages[step];
      step++;
      setTimeout(animateStep, 2500);

    } else if (step === 1) {
      // Reset scanner line position and hide it
      scannerLine.style.transition = "none";
      scannerLine.style.transform = "translateY(-140px)";

      // Highlight Phishing site node + arrow
      nodes[2].style.opacity = 1;
      arrows[1].style.opacity = 1;

      commentBox.textContent = messages[step];
      step++;
      setTimeout(animateStep, 2500);

    } else if (step === 2) {
      // Highlight Data Theft node + arrow
      nodes[3].style.opacity = 1;
      arrows[2].style.opacity = 1;

      commentBox.textContent = messages[step];

      // Animate masked input color change (simulate user input)
      const maskedInputs = container.querySelectorAll('.masked-input');
      let inputStep = 0;

      function animateInput() {
        if (inputStep < maskedInputs.length) {
          maskedInputs[inputStep].style.color = '#d9534f'; // red "input"
          setTimeout(() => {
            maskedInputs[inputStep].style.color = '#007bff'; // revert
            inputStep++;
            animateInput();
          }, 700);
        } else {
          setTimeout(() => {
            step++;
            animateStep();
          }, 1000);
        }
      }
      animateInput();

    } else if (step === 3) {
      // Show data stolen message and full comment
      commentBox.textContent = messages[step];
      dataStolenMsg.style.display = "inline-block";

      fullCommentBox.innerHTML = fullComment;
      fullCommentBox.style.display = "block";

      btn.disabled = false;
    }
  }

  animateStep();
}


//
// === Pipeline demo ===
//
function runPipelineAttack(containerId, btn) {
  const container = document.getElementById(containerId);
  const nodes = container.querySelectorAll('.chain .node');
  const commentBox = container.querySelector('.comment-box');
  const fullCommentBox = container.querySelector('.full-comment');
  const vpnLoginDiv = container.querySelector('.vpn-login');
  const infectionDiv = container.querySelector('.infection-spread');
  const scadaDiv = container.querySelector('.scada-compromise');
  const shutdownDiv = container.querySelector('.pipeline-shutdown');
  const usernameText = container.querySelector('#username-text');
  const passwordText = container.querySelector('#password-text');

  const messages = [
    "Attacker logs in with stolen VPN credentials...",
    "Malware spreads across internal servers and workstations...",
    "SCADA controllers compromised; alarms triggered...",
    "Pipeline operations halted; system shutdown initiated."
  ];

  const fullComment = container.querySelector('#full-comment-pipeline p').innerHTML;

  // Reset everything
  nodes.forEach(n => {
    n.style.opacity = 0.3;
    n.classList.remove('completed');
    n.classList.remove('active');
  });
  vpnLoginDiv.style.display = 'none';
  infectionDiv.style.display = 'none';
  scadaDiv.style.display = 'none';
  shutdownDiv.style.display = 'none';
  commentBox.textContent = '';
  fullCommentBox.style.display = 'none';
  fullCommentBox.textContent = '';
  usernameText.textContent = '';
  passwordText.textContent = '';

  btn.disabled = true;
  let step = 0;

  function animateTyping(element, text, callback) {
    element.textContent = '';
    let i = 0;
    let interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 120);
  }

  function updateNodesHighlight(index) {
    nodes.forEach((n, i) => {
      if (i < index) {
        n.style.opacity = 0.7;    // Пройдені кроки
        n.classList.add('completed');
        n.classList.remove('active');
      } else if (i === index) {
        n.style.opacity = 1;      // Активний крок
        n.classList.add('active');
        n.classList.remove('completed');
      } else {
        n.style.opacity = 0.3;    // Майбутні кроки
        n.classList.remove('completed');
        n.classList.remove('active');
      }
    });
  }

  function showStep() {
    updateNodesHighlight(step);

    // Покажемо всі попередні візуальні блоки разом з поточним
    if (step >= 0) vpnLoginDiv.style.display = 'flex';
    if (step >= 1) infectionDiv.style.display = 'flex';
    if (step >= 2) scadaDiv.style.display = 'flex';
    if (step >= 3) shutdownDiv.style.display = 'flex';

    switch(step) {
      case 0:
        commentBox.textContent = messages[step];
        animateTyping(usernameText, "pipeline_user", () => {
          animateTyping(passwordText, "••••••••", () => {
            setTimeout(() => {
              step++;
              showStep();
            }, 1500);
          });
        });
        break;

      case 1:
      case 2:
        commentBox.textContent = messages[step];
        setTimeout(() => {
          step++;
          showStep();
        }, 3500);
        break;

      case 3:
        commentBox.textContent = messages[step];
        setTimeout(() => {
          commentBox.textContent = '';
          fullCommentBox.style.display = 'block';
          fullCommentBox.textContent = fullComment;
          btn.disabled = false;
        }, 3000);
        break;
    }
  }

  showStep();
}



//
// === GPS jamming demo ===
//
function runGPSAttack(containerId, btn) {
  const container = document.getElementById(containerId);
  const nodes = container.querySelectorAll('.chain .node');
  const commentBox = container.querySelector('.comment-box');
  const fullCommentBox = container.querySelector('.full-comment');

  const gpsDiv = container.querySelector('.gps-signal');
  const spoofDiv = container.querySelector('.spoofing-device');
  const fakeLocDiv = container.querySelector('.spoofed-location');
  const errorDiv = container.querySelector('.nav-error');

  const messages = [
    "Satellite sends accurate GPS signal...",
    "Spoofing device jams and injects fake location...",
    "Aircraft and ship receive counterfeit GPS coordinates...",
    "Navigation errors occur — danger ahead!"
  ];

  const fullComment = fullCommentBox.innerHTML;

  // Reset state
  nodes.forEach(n => {
    n.style.opacity = 0.3;
    n.classList.remove('completed');
    n.classList.remove('active');
  });
  [gpsDiv, spoofDiv, fakeLocDiv, errorDiv].forEach(d => d.style.display = "none");
  commentBox.textContent = "";
  fullCommentBox.style.display = "none";
  fullCommentBox.textContent = "";
  btn.disabled = true;

  let step = 0;

  function updateNodesHighlight(index) {
    nodes.forEach((n, i) => {
      if (i < index) {
        n.style.opacity = 0.7;    // Пройдені кроки
        n.classList.add('completed');
        n.classList.remove('active');
      } else if (i === index) {
        n.style.opacity = 1;      // Активний крок
        n.classList.add('active');
        n.classList.remove('completed');
      } else {
        n.style.opacity = 0.3;    // Майбутні кроки
        n.classList.remove('completed');
        n.classList.remove('active');
      }
    });
  }

  function showStep() {
    updateNodesHighlight(step);

    // Показати всі блоки до поточного кроку включно
    if (step >= 0) gpsDiv.style.display = 'flex';
    if (step >= 1) spoofDiv.style.display = 'flex';
    if (step >= 2) fakeLocDiv.style.display = 'flex';
    if (step >= 3) errorDiv.style.display = 'flex';

    commentBox.textContent = messages[step];

    setTimeout(() => {
      if (step < 3) {
        step++;
        showStep();
      } else {
        commentBox.textContent = "";
        fullCommentBox.style.display = "block";
        fullCommentBox.innerHTML = fullComment;
        btn.disabled = false;
      }
    }, step === 0 ? 2500 : 3000);
  }

  showStep();
}

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

function runPipelineAttack(containerId, btn) {
  const container = document.getElementById(containerId);
  const nodes = container.querySelectorAll('.chain .node');
  const commentBox = container.querySelector('.comment-box');
  const fullCommentBox = container.querySelector('.full-comment');
  const usernameText = container.querySelector('#username-text');
  const passwordText = container.querySelector('#password-text');

  const steps = [
    { containerClass: 'vpn-login', lines: 3 },
    { containerClass: 'infection-spread', lines: 2 },
    { containerClass: 'scada-compromise', lines: 2 },
    { containerClass: 'pipeline-shutdown', lines: 2 }
  ];

  const fullComment = container.querySelector('#full-comment-pipeline p').innerHTML;

  // Reset state
  nodes.forEach(n => {
    n.style.opacity = 0.3;
    n.classList.remove('completed', 'active');
  });
  fullCommentBox.style.display = "none";
  fullCommentBox.textContent = "";
  commentBox.textContent = "";
  usernameText.textContent = "";
  passwordText.textContent = "";

  // Hide and reset opacity for all blocks and their children
  steps.forEach(s => {
    const block = container.querySelector(`.${s.containerClass}`);
    block.style.display = "none";
    block.querySelectorAll('div').forEach(div => div.style.opacity = 0);
  });

  btn.disabled = true;
  btn.textContent = 'Running...';

  let stepIndex = 0;
  let lineIndex = 0;

  function highlightNodes(idx) {
    nodes.forEach((n, i) => {
      if (i < idx) {
        n.style.opacity = 0.7;
        n.classList.add('completed');
        n.classList.remove('active');
      } else if (i === idx) {
        n.style.opacity = 1;
        n.classList.add('active');
        n.classList.remove('completed');
      } else {
        n.style.opacity = 0.3;
        n.classList.remove('completed', 'active');
      }
    });
  }

  function animateTyping(element, text, speed = 60) {
    return new Promise(resolve => {
      element.textContent = '';
      let i = 0;
      function step() {
        if (i < text.length) {
          element.textContent += text[i];
          i++;
          setTimeout(step, speed);
        } else {
          resolve();
        }
      }
      step();
    });
  }

  async function showNextLine() {
    if (stepIndex >= steps.length) {
      // Finished all steps
      commentBox.textContent = "";
      fullCommentBox.style.display = "block";
      fullCommentBox.style.opacity = 0;
      fullCommentBox.innerHTML = fullComment;
      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.05;
        fullCommentBox.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
      }, 40);

      btn.disabled = false;
      btn.textContent = 'Run Pipeline Attack';
      return;
    }

    const step = steps[stepIndex];
    const block = container.querySelector(`.${step.containerClass}`);
    const lines = block.querySelectorAll('div');

    if (lineIndex === 0) {
      block.style.display = 'flex';
      block.style.flexDirection = 'column';
      block.style.gap = '6px';
    }

    if (lineIndex < step.lines) {
      // Animate showing current line
      lines[lineIndex].style.opacity = 1;

      // Для VPN login кроку оновимо коментар або інші поля:
      if (step.containerClass === 'vpn-login') {
        if (lineIndex === 0) {
          await animateTyping(commentBox, "Attacker logs in with stolen VPN credentials...");
        } else if (lineIndex === 1) {
          await animateTyping(usernameText, "pipeline_user", 40);
        } else if (lineIndex === 2) {
          await animateTyping(passwordText, "••••••••", 80);
        }
      } else {
        // В інших кроках просто виводимо текст у commentBox
        await animateTyping(commentBox, lines[lineIndex].textContent);
      }

      lineIndex++;
      setTimeout(showNextLine, 1000);
    } else {
      highlightNodes(stepIndex);
      stepIndex++;
      lineIndex = 0;
      setTimeout(showNextLine, 1000);
    }
  }

  showNextLine();
}


//
// === GPS jamming demo ===
//
function runGPSAttack(containerId, btn) {
  const container = document.getElementById(containerId);
  const nodes = container.querySelectorAll('.chain .node');
  const commentBox = container.querySelector('.comment-box');
  const fullCommentBox = container.querySelector('.full-comment');

  const steps = [
    { containerClass: 'gps-signal', lines: 1 },
    { containerClass: 'spoofing-device', lines: 2 },
    { containerClass: 'spoofed-location', lines: 2 },
    { containerClass: 'nav-error', lines: 2 }
  ];

  const fullComment = fullCommentBox.innerHTML;

  // Скидаємо стан
  nodes.forEach(n => {
    n.style.opacity = 0.3;
    n.classList.remove('completed', 'active');
  });
  fullCommentBox.style.display = "none";
  fullCommentBox.textContent = "";
  commentBox.textContent = "";
  btn.disabled = true;

  // Сховати всі рядки
  steps.forEach(s => {
    const block = container.querySelector(`.${s.containerClass}`);
    block.style.display = "none";
    const items = block.querySelectorAll('div');
    items.forEach(i => i.style.opacity = 0);
  });

  let stepIndex = 0;
  let lineIndex = 0;

  function highlightNodes(idx) {
    nodes.forEach((n, i) => {
      if (i < idx) {
        n.style.opacity = 0.7;
        n.classList.add('completed');
        n.classList.remove('active');
      } else if (i === idx) {
        n.style.opacity = 1;
        n.classList.add('active');
        n.classList.remove('completed');
      } else {
        n.style.opacity = 0.3;
        n.classList.remove('completed', 'active');
      }
    });
  }

  function showNextLine() {
    if (stepIndex >= steps.length) {
      // Всі кроки показані
      commentBox.textContent = "";
      fullCommentBox.style.display = "block";
      fullCommentBox.innerHTML = fullComment;
      btn.disabled = false;
      return;
    }

    const step = steps[stepIndex];
    const block = container.querySelector(`.${step.containerClass}`);
    const items = block.querySelectorAll('div');

    if (lineIndex === 0) {
      // Показуємо блок
      block.style.display = 'flex';
      block.style.flexDirection = 'column';
      block.style.gap = '6px';
    }

    if (lineIndex < step.lines) {
      // Показуємо наступний рядок анімацією
      items[lineIndex].style.opacity = 1;
      commentBox.textContent = items[lineIndex].textContent;

      lineIndex++;

      setTimeout(showNextLine, 3000);
    } else {
      // Крок завершено, переходимо до наступного
      highlightNodes(stepIndex);
      stepIndex++;
      lineIndex = 0;
      setTimeout(showNextLine, 1000);
    }
  }

  showNextLine();
}

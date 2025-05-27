async function saveColor() {
            const color = document.getElementById('colorPicker').value;
            await fetch('/color', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ color })
            });
            loadColors();
        }

        async function loadColors() {
            const res = await fetch('/colors');
            const colors = await res.json();
            const container = document.getElementById('colorList');
            container.innerHTML = '';
            colors.forEach(c => {
                const box = document.createElement('div');
                box.style.background = c;
                box.style.width = '50px';
                box.style.height = '50px';
                box.style.border = '1px solid #000';
                container.appendChild(box);
            });
        }

        loadColors(); 

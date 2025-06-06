(function () {
    const endpoint = 'https://your-server.com/view-counter';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: window.location.pathname
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.views === 'number') {
                const viewDisplay = document.createElement('div');
                viewDisplay.style.position = 'fixed';
                viewDisplay.style.bottom = '10px';
                viewDisplay.style.right = '10px';
                viewDisplay.style.background = 'rgba(0, 0, 0, 0.7)';
                viewDisplay.style.color = 'white';
                viewDisplay.style.padding = '5px 10px';
                viewDisplay.style.borderRadius = '5px';
                viewDisplay.style.zIndex = '1000';
                viewDisplay.textContent = `Views: ${data.views}`;
                document.body.appendChild(viewDisplay);
            }
        })
        .catch(error => {
            console.error('View counter error:', error);
        });
})();

// Metode til at sender vores nye bruger til vores endpoint.
const submitNewUser = (e) => {

    let form = document.querySelector('#userform');

    // Forhindre vorew event i at udføre default. (vi tager over herfra)
    e.preventDefault();

    // Samler vores input vir form.elements.
    let formInputs = form.elements;

    // Opretter et nyt user objekt
    let newUser =  {
        'username': formInputs['username'].value,
        'name' : formInputs['name'].value,
        'email' : formInputs['email'].value,
        'streetname' : formInputs['streetname'].value,
        'zipcode' : formInputs['zipcode'].value,
        'password' : formInputs['password'].value
    }

    // Benytter fetch til at POST(e) vores newUser objekt til vores endpoint (localhost:3000/users/register)
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then((response) => response.json()).then((response) => {

        showResponse(response.message);

    });

}

// Metode til at vise response beskeden.
const showResponse = (response) => {

    let status = document.querySelector('.status-bar');
    status.textContent = response;
    status.classList.add('active');

    setTimeout(() => {
        status.classList.remove('active');
    }, 3000)

}





// Metode til at liste brugerer hvis der er en <div class="list-users-container"></div> på siden..
const listUsersByQuery = (query) => {

    let usersContainer = document.querySelector('.list-users-container');

    const listRowHeaderTmpl = `
        <div class="list-users-row">
            <div><strong>NAME</strong></div>
            <div><strong>EMAIL</strong></div>
            <div><strong>USERNAME</strong></div>
            <div><strong>ZIPCODE</strong></div>
            <div><strong>STREETNAME</strong></div>
            <div><strong>ACTIONS</strong></div>
        </div>
    `;

    const listRowItemTmpl = (user) => `
        <div class="list-users-row" id="row_${user.username}">
            <div>${user.name}</div>
            <div>${user.email}</div>
            <div>${user.username}</div>
            <div>${user.address.zipcode}</div>
            <div>${user.address.streetname}</div>
            <div>   
                <button class="action-btn" data-action="delete" data-username="${user.username}">DELETE</button>
                <button class="action-btn" data-action="update" data-username="${user.username}">UPDATE</button>
            </div>
        </div>
    `;

    const ventPaaMig = () => {
        console.log('ventPaaMig : JEG SKAL LIGE NOGET, DER GÅR LIGE 5 SEKUNDER');
        return new Promise(resolve => {
            setTimeout(() => {

                console.log('ventPaaMig : JEG KOM FØRST');

                resolve();
            }, 5000);
        });
    
    }

    const ogsaaVentPaaMig = () => {

        console.log('ogsaaVentPaaMig : JEG SKAL OGSÅ LIGE NOGET, DER GÅR LIGE 3 SEKUNDER');
        return new Promise(resolve => {
 
            setTimeout(() => {
                resolve('SÅ NU ER JEG HER');
            }, 3000);
        });
    
    }

    const doAction = async (e) => {

        switch (e.currentTarget.dataset.action) {
            case 'delete':

                await fetch('http://localhost:3000/users/delete/' + e.currentTarget.dataset.username, {
                    method: 'DELETE',
                }).then((response) => response.json()).then(() => {
            
                   
                    showResponse('Bruger er slettet');
                    listUsersByQuery();
     
                })

                break;
        
            case 'update':
                    console.log('SÅ DER ASYNC!');
                    await ventPaaMig();
                    await ogsaaVentPaaMig().then((response) => console.log(response))
                    console.log('ENDELIG!');
                break;

            default:
                break;

        }
        
    }

    if(usersContainer)
    {
        fetch('http://localhost:3000/users/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:query,
        }).then((response) => response.json()).then((response) => {
    
            let usersContainer = document.querySelector('.list-users-container');
            usersContainer.innerHTML = '';
        
            var unorderList = document.createElement('div');
            let list = usersContainer.insertAdjacentElement('beforeend', unorderList);

            list.insertAdjacentHTML('beforeend', listRowHeaderTmpl);

            response.data.forEach((user) => {
                list.insertAdjacentHTML('beforeend', listRowItemTmpl(user))
            })

            let btns = document.querySelectorAll('.action-btn');
            btns.forEach((btn) => {
            
                btn.addEventListener('click', doAction);
            
            })
        })
    }
}

const queryResults = (e) => {

    e.preventDefault();

    let queryform = document.querySelector('#queryForm');
    let formInputs = queryform.elements;
    let query = formInputs['query'].value;
    


    listUsersByQuery(query);


}

const navBar = {
    
    setup : (elm) => {

        if(elm) {

            elm.insertAdjacentHTML('beforeend', `
                <a href="/">Forside</a>
                <a href="/create">Create</a>
                <a href="/query">Query</a>
            `)
        }

    }

}

let client = {};

client.init = () => {

    let form = document.querySelector('#userform');
    let queryform = document.querySelector('#queryForm');
    let nav = document.querySelector('.nav-bar')
    
    if(form)
    {
        form.addEventListener('submit', submitNewUser);
    }

    if(queryform) {
        queryform.addEventListener('submit', queryResults)
    }

    navBar.setup(nav);
    listUsersByQuery()
}

client.init()
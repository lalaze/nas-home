export type dataProp = {
    name: string
    url: string
    icon: string
}

class Store {
    private db: any

    constructor() {
         // 如果没有这个数据库,open会自动创建
        const DBOpenRequest = window.indexedDB.open("nas-home", 1);
        DBOpenRequest.onsuccess = (e: any) => {
            this.db = e.target.result
        }
        // 如果是新建，数据库新建完会执行这个
        DBOpenRequest.onupgradeneeded = (e: any) => {
            // 如果没有库的话，会先走这里，再onsuccess
            this.db = e.target.result
            if (this.db && !this.db.objectStoreNames.contains('entrance')) {
                // 建表
                this.db.createObjectStore('entrance', {  autoIncrement: true  })
            }
        }
    }

    // id一样可以更新
    public set(data: dataProp) {
        const store = this.db.transaction(['entrance'], 'readwrite').objectStore('entrance')
        const request = store.put(data)

        request.onsuccess = function () {
            console.log('update log success')	
        }
        
        request.onerror = function () {
            console.error('update log fail')
        }	

    }

    public getAll() {
        return new Promise((resolve) => {
            const store = this.db.transaction(['entrance']).objectStore('entrance');
            const request = store.openCursor()
            const data: dataProp[] = []
            request.onsuccess = function (event: any) {
                const cursor = event.target.result;
                if(cursor){
                    data.push(cursor.value)
                    cursor.continue();
                }
                else{
                    resolve(data)
                    console.log('没有更多数据了');
                }
           }
        })
    }
}

const store = new Store()

export default store
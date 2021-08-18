
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const div_playlist =  $('.playlist')
const div_song = $$('.song')

// tạo object app gồm tất cả các property và method của Application
const app ={
    currentIndex : 0,
    definePorperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function() { return this.songs[this.currentIndex]}
        })
    },

    getCurrentSong : function(){
        return this.songs[this.currentIndex]
    },
    idf:0,
    songs: [
        {   
            name: 'Muộn rồi mà sao còn',
            singer: 'MTP',
            path: './audio/MuonRoiMaSaoCon.mp3',
            image: './image/muon-roi-ma-sao-con.jpg'
        },

        {
            name: 'Có chắc yêu là đây',
            singer: 'MTP',
            path: './audio/CoChacYeuLaDay.mp3',
            image: './image/co-chac-yeu-la-day.jpg'
        },

        {
            name: 'Chúng ta của hiện tại',
            singer: 'MTP',
            path: './audio/ChungTaCuaHienTaiLofiVersion.mp3',
            image: './image/chung-ta-cua-hien-tai.jpg'
        },

        {
            name: 'Hãy trao cho anh',
            singer: 'MTP',
            path: './audio/HayTraoChoAnh.mp3',
            image: './image/hay-trao-cho-anh.jpg'
        },

        {
            name: 'Nơi này có anh',
            singer: 'MTP',
            path: './audio/NoiNayCoAnh.mp3',
            image: './image/noi-nay-co-anh.jpg'
        },

        
        {
            name: 'Lạc trôi Mix',
            singer: 'MTP ft TrippleD remix',
            path: './audio/LacTroiMix.mp3',
            image: './image/lac-troi.jpg'
        },

        
        {
            name: 'Chúng ta không thuộc về nhau',
            singer: 'MTP',
            path: './audio/ChungTaKhongThuocVeNhau.mp3',
            image: './image/chung-ta-khong-thuoc-ve-nhau.jpg'
        },

        {
            name: 'Chắc ai đó sẽ về',
            singer: 'MTP',
            path: './audio/ChacAiDoSeVe.mp3',
            image: './image/chac-ai-do-se-ve.jpg'
        },

        {
            name: 'Buông đôi tay nhau ra',
            singer: 'MTP',
            path: './audio/BuongDoiTayNhauRa.mp3',
            image: './image/buong-doi-tay-nhau-ra.jpg'
        },

    ],

    // thêm id cho
    renderHtml : function(){
        console.log('đã render HTML')
        var html = this.songs.map(function(song,index){
            return `
                <div class="song ${app.currentIndex === index ? 'active' : '' }" id="${index}">
                    <div class="thumb" style="background-image: url(${song.image})">
                        </div>
                            <div class="body">
                                <h3 class="title"> ${song.name} </h3>
                                <p class="author"> ${song.singer} </p>
                            </div>
                        <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
          `

        })

        // trong <div.playlist> là <div.song> -> innerHTML <div.song> vào <div.playlist>
        div_playlist.innerHTML = html.join('')
    },
    cd : $('.cd'),
    btnPlay : $('.btn.btn-toggle-play'),
    cdcd: $('.cd-thumb'),
    dashboard: $('.dashboard'), 
    div_control: $('.control'),
    audio: $('#audio'),
    player: $('.player'),
    isPlaying: false, // trạng thái audio là có đang playing bài hát hay ko, mặc định là false
    thanh_progress: $('#progress'),
    btnNext : $('.btn.btn-next'),
    btnPrev : $('.btn.btn-prev'),
    btnRepeat: $('.btn.btn-repeat'),
    btnRandom: $('.btn.btn-random'),
    songPlaylist: $$('.song'),
    playList: $('.playlist'),
    //songId: songPlaylist.$(`#${h}`),
    repeatState: false,
    randomstate: false,

    // hàm xử lý tất cả các events xảy ra trong app 
    handleEvent : function(){
        const cdWidth = this.cd.offsetWidth
        var nextOrPrev = 1
        // XỬ lý khi scroll
        
        document.onscroll = function(){
            const scrollYpx = document.documentElement.scrollTop || window.scrollY
            
            const cdNewWidth = cdWidth - scrollYpx
            app.cd.style.width = cdNewWidth > 0? cdNewWidth +'px' : 0
            app.cd.style.opacity = cdNewWidth / cdWidth 
            
        }

        // Xử lý cho CD quay khi playing
        const cdRotating = this.cdcd.animate( [{transform: 'rotate(360deg)'}] , {duration: 15000 , iterations: Infinity})
        cdRotating.pause()  // mặc định lúc đầu là ko quay
        console.log(cdRotating)
        // Xử lý Play/Pause 
        function pauser(){
            app.isPlaying = false
            audio.pause()
            app.player.classList.remove('playing')
    
        }

        function player(){
            app.isPlaying = true
            audio.play()
            app.player.classList.add('playing')

        }

        this.btnPlay.onclick = function(){
            if(app.isPlaying){
                pauser()
                cdRotating.pause()
            }
            else{
                player()
                cdRotating.play()
            }
        }

        this.btnRepeat.onclick = function(){
            if(app.repeatState){
                app.repeatState=false
                app.btnRepeat.style.color = '#666'
            }
            else{
                app.repeatState=true
                app.btnRepeat.style.color = 'red'
            }
        }

        this.btnRandom.onclick = function(){
            if(app.randomstate){
                app.randomstate=false
                app.btnRandom.style.color = '#666'
            }
            else{
                app.randomstate=true
                app.btnRandom.style.color ='red'
            }
        }
        // xử lý khi tiến độ (progress) bài hát thay đổi
        audio.ontimeupdate = function(){
            // audio.currentTime : thời gian hiện tại của tiến trình audio
            // audio.duration : độ dài tính theo second của audio
            // progress value : thời gian hiện tại/độ dài audio
            app.thanh_progress.value = Math.floor(audio.currentTime/audio.duration*100)
            if(audio.currentTime === audio.duration){
                if(app.repeatState){
                    console.log('repeat')
                    audio.currentTime=0
                    player()
                }
                else{
                    console.log('Next')
                    app.currentIndex +=1
                    nextSong()
                }
            }

             


        }  
        // xử lý khi tua(seek)
        this.thanh_progress.onchange = function(){   
            audio.currentTime = app.thanh_progress.value / 100 * audio.duration
        }
        
        function nextSong(){
            console.log('curent indexNextSong()'+ app.currentIndex)
            if(app.randomstate){
                var rand =  Math.floor(Math.random()*(app.songs.length))
                while(app.currentIndex === rand){
                    rand = Math.floor(Math.random()*(app.songs.length))
                    console.log(app.currentIndex) 
                }
                app.currentIndex = rand
            }
            else{
                if(app.currentIndex > app.songs.length-1){
                    app.currentIndex = 0
                }
                else if(app.currentIndex < 0){
                    app.currentIndex = app.songs.length-1
                }
            }
            scrollToTheNextSong()
            app.loadCurrentSong()
            console.log(app.currentIndex)
            app.renderHtml()
            player()
            cdRotating.play()

        }
        // Next, Previous
        this.btnNext.onclick = function(){  
            app.currentIndex +=1
            nextSong()
        }

        this.btnPrev.onclick = function(){
            app.currentIndex -=1
            nextSong()
        }
        
        function scrollToTheNextSong(){
            $('.song.active').scrollIntoView({ behavior: 'smooth' , block: 'center', inline:'nearest'})
        }

        // e:tên sự kiện catch được, target: đối tượng element mà   event catch được
        this.playList.onclick = function(e){
            const songClicked = e.target.closest('.song:not(.active)')
            // nếu e.target chứa selector: .song mà ko phải đang active(song khác song hiện tại đang phát)
            if(songClicked && !e.target.closest('.option')){
                console.log(e.target)
                app.currentIndex = Number(songClicked.getAttribute('id')) 
                console.log( app.currentIndex)
                nextSong()
            }
        }

    },
    
    getSongClicked(){
        console.log(this.songPlaylist)
        this.songPlaylist.forEach(function(song,index){
            song.onclick =  function(){
                console.log(song)
                app.currentIndex = index
                app.loadCurrentSong()
            }
        })
    },

    loadCurrentSong(){
        this.cdcd.style = `background-image : url(${this.getCurrentSong().image})`
        this.dashboard.querySelector('h2').innerHTML = this.getCurrentSong().name
        this.dashboard.querySelector('h3').innerHTML = this.getCurrentSong().singer
        this.dashboard.querySelector('audio')
        this.audio.src = this.getCurrentSong().path
    },

    startApp : function(){
        
        this.renderHtml() // = app.renderHtml
        this.handleEvent()
        this.getCurrentSong()
        this.loadCurrentSong()
        //this.getSongClicked()

    }


}

app.startApp()
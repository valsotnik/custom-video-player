const player = document.querySelector('.video-item');
const video = player.querySelector('.viewer');
const playButton = player.querySelector('.play');
const playButtonCenter = player.querySelector('.play-btn');
const volume = player.querySelector('.volume');
const currentTimeElement = player.querySelector('.current');
const durationTimeElement = player.querySelector('.duration');
const fullscreen = player.querySelector('.fullscreen');
const poster = player.querySelector('.front-image')
const progress = player.querySelector('.progress');
const volButton = player.querySelector('.volume-icon');
const ranges = player.querySelectorAll('.player-slider');

// ===============================
function togglePlay () {
	const method = video.paused ? 'play' : 'pause';
	video[method]()
	playButtonCenter.classList.toggle('play-btn-out');
}

function changePlayButton () {
	const icon = this.paused ? playButton.classList.remove('pause') :
				 										 playButton.classList.add('pause');
}

function buttonCenterCheck () {
const icon = this.paused ? playButtonCenter.classList.remove('play-btn-out') :
				 										 playButtonCenter.classList.add('play-btn-out');
}

function frontImageOff () {
	poster.classList.add('image-none');
}

function muteOff () {
	video.muted = !video.muted;
	volButton.classList.toggle('mute');	
}

function muteOffZero () {
	if (this.value !== '0') {
		volButton.classList.remove('mute');
	} else {
		volButton.classList.add('mute');
	}
}

function muteBlockIcon () {
	if (volume.value === '0') {
		volButton.classList.toggle('mute');	
		muteOff()
	}
}

function curAndDurTime () {
	let currentMinutes = Math.floor(video.currentTime / 60);
	let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
	let durationMinutes = Math.floor(video.duration / 60);
	let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
	currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`
	durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`
}

function fullscreenMode () {
	video.requestFullscreen();
}

function handleRangeUpdate () {
	video[this.name] = this.value;
}

function handleProgress () {
	const percent = (video.currentTime / video.duration) * 100;
	progress.value = percent;
}

function changeLine () {
	const value = progress.value;
	progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, rgb(204, 204, 204) ${value}%, rgb(204, 204, 204) 100%)`
}

function changePlayPosition () {
	changeLine();
	video.currentTime = video.duration * (progress.value / 100);
}

function changeLineVolume () {
	const volValue = volume.value;
	volume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volValue * 100}%, rgb(204, 204, 204) ${volValue * 100}%, rgb(204, 204, 204) 100%)`
}

// =========================

video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
playButtonCenter.addEventListener('click', frontImageOff);
playButtonCenter.addEventListener('click', togglePlay);
video.addEventListener('play', changePlayButton);
video.addEventListener('pause', changePlayButton);
video.addEventListener('play', buttonCenterCheck);
video.addEventListener('pause', buttonCenterCheck);
volButton.addEventListener('click', muteOff); 
volButton.addEventListener('click', muteBlockIcon); 
volume.addEventListener('input', changeLineVolume);
volume.addEventListener('change', muteOffZero);
video.addEventListener('timeupdate', curAndDurTime);
fullscreen.addEventListener('click', fullscreenMode);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('input', changePlayPosition);
video.addEventListener('timeupdate', changeLine);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
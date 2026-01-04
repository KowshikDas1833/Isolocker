//Called when user touches our button.
function audio_player()
{
   AP_file = directory;
   audio_fldrNx = AP_file.lastIndexOf("/");
   audio_fldr = AP_file.substring( 0, audio_fldrNx );
   audio_title = AP_file.substring( audio_fldrNx+1, AP_file.length );
    
    
    //Create dialog window.
    dlg_Audio = app.CreateDialog( null, "NoCancel" );
    //dlg_Audio.SetBackColor( "#cc22cc" );
    dlg_Audio.SetOnBack( AP_Close_OnTouch );
    dlg_Audio.SetOnCancel( AP_Close_OnTouch );
    dlg_Audio.SetSize( 0.9, 0.3 );
    
    //Create a layout for dialog.
    layAudio = app.CreateLayout( "linear", "VCenter,FillXY"  );
    //layAudio.SetPadding( 0.1, 0, 0.1, 0.0 );
    layAudio.SetMargins( 0.01, 0.01, 0.01, 0.01 );
    dlg_Audio.AddLayout( layAudio );
    
  AP_Close = app.CreateButton( "[fa-close]", -1, -1, "Custom,FontAwesome" );
  AP_Close.SetTextSize( 22 );
  AP_Close.SetMargins( 0.38, 0.0, 0.0, 0.0 );
  AP_Close.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
  AP_Close.SetBackColor( "#00000000" );
  AP_Close.SetOnTouch( AP_Close_OnTouch ); 
  layAudio.AddChild( AP_Close ); 
  
   //Create a text scroller
    scrollTitle = app.CreateScroller( -1.0, -1.0 );
    scrollTitle.SetPadding( 0.06, 0, 0.06, 0.02  );
    layAudio.AddChild( scrollTitle );
  
    //Create audio title
    audioTitle = app.CreateText( audio_title, null, null, "SingleLine" );
    audioTitle.SetTextSize( 18 );
    audioTitle.SetMargins( 0.0, 0.01, 0.01, 0.01 );
    scrollTitle.AddChild( audioTitle );
    
    //Create a horizontal layout for icon buttons. 
    audioTime = app.CreateLayout("Linear", "Horizontal"); 
    //audioTime.SetBackColor( "#9900afff" );
    audioTime.SetMargins( 0.0, 0.02, 0.0, 0.0 );
    layAudio.AddChild( audioTime ); 
    
    //Create progress text.
    audioPos = app.CreateText( "00:00:00" );
    audioPos.SetTextSize( 16 );
    audioPos.SetTextColor( "#dddddd" );
    audioPos.SetTextShadow( 20, 5,10, "#aa000000" );
    audioPos.SetMargins( 0.0, 0.0, 0.0, 0.0 );
    audioTime.AddChild( audioPos );
    
    //Create duration  text.
    audioDur = app.CreateText( "00:00:00" );
    audioDur.SetTextSize( 16 );
    audioDur.SetTextColor( "#dddddd" );
    audioDur.SetTextShadow( 20, 5,10, "#aa000000" );
    audioDur.SetMargins( 0.5, 0.0, 0.0, 0.0 );
    audioTime.AddChild( audioDur );
    
    //Create seek bar and add to layout.
	  skbPlr = app.CreateSeekBar( 0.9, -1 );
	  skbPlr.SetMargins( 0, 0.0, 0, 0 );
	  skbPlr.SetRange( 1.0 );
	  skbPlr.SetOnTouch( skbPlr_OnTouch );
	  layAudio.AddChild( skbPlr );
	  
	  //Create a horizontal layout for icon buttons. 
    layBut_audio = app.CreateLayout("Linear", "Horizontal"); 
    layBut_audio.SetMargins( 0.01, 0.01, 0.01, 0.01 );
    layAudio.AddChild( layBut_audio ); 
    
    audio_backBtn = app.CreateButton( "[fa-backward]", -1, -1, "Custom,FontAwesome" );
    audio_backBtn.SetTextSize( 22 );
    audio_backBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    audio_backBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    audio_backBtn.SetBackColor( "#00000000" );
    audio_backBtn.SetOnTouch( audio_backBtn_OnTouch ); 
    layBut_audio.AddChild( audio_backBtn ); 
    
    audio_playBtn = app.CreateButton( "[fa-pause]", -1, -1, "Custom,FontAwesome" );
    audio_playBtn.SetTextSize( 22 );
    audio_playBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    audio_playBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    audio_playBtn.SetBackColor( "#00000000" );
    audio_playBtn.SetOnTouch( audio_playBtn_OnTouch ); 
    layBut_audio.AddChild( audio_playBtn ); 
    
    audio_forwardBtn = app.CreateButton( "[fa-forward]", -1, -1, "Custom,FontAwesome" );
    audio_forwardBtn.SetTextSize( 22 );
    audio_forwardBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    audio_forwardBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    audio_forwardBtn.SetBackColor( "#00000000" );
    audio_forwardBtn.SetOnTouch( audio_forwardBtn_OnTouch ); 
    layBut_audio.AddChild( audio_forwardBtn ); 
	  
	  

    //Create media AudioPlr.
	  AudioPlr = app.CreateMediaPlayer();
	  AudioPlr.SetOnReady( AudioPlr_OnReady );
	  AudioPlr.SetOnComplete( AudioPlr_OnComplete );
	  
	  //Load the first file found.
	AudioPlr.SetFile( AP_file );
	dur = null;
	
	//Start timer to update seek bar every second.
	setInterval( "audioUpdate()", 1000 );
	setInterval( updateScroll, 400 );
	scrollPos = null;
	scrollMax = null;
    //Show dialog.
    dlg_Audio.Show();
}



//Called when file is ready to play.
function AudioPlr_OnReady()
{
	//Get file duration.
	dur = AudioPlr.GetDuration();
	AudioPlr.Play( );
	//app.ShowPopup( "Ready" );
}

//Called when user touches the seek bar.
function skbPlr_OnTouch( value )
{
	AudioPlr.SeekTo( dur * value );
}

//Update seek bar.
function audioUpdate()
{
	
	//Determining running time of the audio. (secs to H:mm:ss convert)
  prog = AudioPlr.GetPosition();
  posTime = moment.utc( prog* 1000).format('HH:mm:ss');
  audioPos.SetText( posTime );
  //Determining duration of the audio.(secs to H:mm:ss convert)
  dur = AudioPlr.GetDuration();
  durTime = moment.utc( dur* 1000).format('HH:mm:ss');
  audioDur.SetText( durTime );
  
  if( dur ) { skbPlr.SetValue( prog / dur ); } //Set seekbar position.
  if( AudioPlr.IsPlaying() ) { audio_forwardBtn.SetEnabled( true ); } //Enable forward button while playing.
 
 
}

function audio_playBtn_OnTouch()
{ //play or pause button control.
 if( AudioPlr.IsPlaying() ) 
          { 
            AudioPlr.Pause();
            audio_playBtn.SetText( "[fa-play]" ); 
          }
  else 
          {
            AudioPlr.Play();
            audio_playBtn.SetText( "[fa-pause]" );
          }
}


function audio_forwardBtn_OnTouch()
{
  AudioPlr.SeekTo( prog + 10 ); //+10 sec forward
}

function audio_backBtn_OnTouch()
{
  AudioPlr.SeekTo( prog - 10 ); //-10 sec backward
}

//Called when playback has finished.
function AudioPlr_OnComplete()
{
	audio_playBtn.SetText( "[fa-play]" );
	audio_forwardBtn.SetEnabled( false ); //Disable forward button at audio finised.
}


function AP_Close_OnTouch()
{
   AudioPlr.Stop();
   AudioPlr.Close();
   dlg_Audio.Dismiss();
}


function updateScroll()
{ 
  scrollPos += 0.01;
  scrollTitle.ScrollTo( scrollPos );
  scrollMaxOn = scrollTitle.GetScrollX();
  if( scrollMaxOn == scrollMax ) { scrollTitle.ScrollTo( 0.0 ); scrollPos = 0.0; }
  scrollMax = scrollMaxOn;
}
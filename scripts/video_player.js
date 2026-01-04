//Called when user open a video file.
function video_player()
{    
    //Create dialog window.
    vpMain = app.CreateDialog( );
    vpMain.SetSize( -1.0, -1.0 );
    vpMain.SetBackColor( "#000000" );
    vpMain.SetOnCancel( CancelBtn_OnTouch );
    //Show dialog.
    vpMain.Show();

    
    //create video layout.
  layVP = app.CreateLayout( "linear", "VCenter,FillXY" );
  //layVP.SetBackColor( "#cc22cc" );
  layVP.SetSize( -1.0, -1.0 );

  app.ShowProgress( "Loading..." );
  //Create Video player.
  player = app.CreateVideoView(  );
  player.SetVolume( 1.0, 1.0 );
  player.SetOnReady( player_OnReady );
  player.SetOnError( player_OnError );
  player.SetOnComplete( player_OnComplete );
  layVP.AddChild( player );
  //Control panel popup.
  layVP.SetOnTouchDown( layVP_OnTouch );
  player.SetFile( directory  );
  vpMain.AddLayout( layVP );

  //Control panel's layout.
  controlVP_V = app.CreateLayout( "linear", "FillXY" );
 // controlVP_V.SetBackColor( "#9900afff" );
  controlVP_V.SetOnTouchDown( controlVP_OnTouch );
  vpMain.AddLayout( controlVP_V );
  
  //Control panel's layout.
  controlVP_H = app.CreateLayout( "linear", "VCenter,FillXY" );
 // controlVP_H.SetBackColor( "#9900afff" );
  controlVP_H.SetOnTouchDown( controlVP_OnTouch );
  vpMain.AddLayout( controlVP_H );
  controlVP_H.Gone();
  
  CancelBtn = app.CreateButton( "[fa-close]", -1, -1, "Custom,FontAwesome" );
  CancelBtn.SetTextSize( 22 );
  CancelBtn.SetMargins( 0.43, 0.0, 0.0, 0.0 );
  CancelBtn.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
  CancelBtn.SetBackColor( "#00000000" );
  CancelBtn.SetOnTouch( CancelBtn_OnTouch ); 
  controlVP_V.AddChild( CancelBtn ); 
  controlVP_H.AddChild( CancelBtn ); 


   //Create a horizontal layout for icon buttons. 
    layTime = app.CreateLayout("Linear", "Horizontal"); 
    //layTime.SetBackColor( "#9900afff" );
    layTime.SetMargins( 0.01, 0.7, 0.01, 0.0 );
    controlVP_V.AddChild( layTime ); 
    controlVP_H.AddChild( layTime );
    
    //Create progress text.
    txtPos = app.CreateText( "00:00:00" );
    txtPos.SetTextSize( 16 );
    txtPos.SetTextColor( "#dddddd" );
    txtPos.SetTextShadow( 20, 5,10, "#aa000000" );
    layTime.AddChild( txtPos );
    
    //Create a seek bar.
    skb = app.CreateSeekBar( 0.6 );
    skb.SetOnTouch( skb_OnTouch );
    skb.SetRange( 1.00 );
    layTime.AddChild( skb );
    
    //Create duration  text.
    txtDur = app.CreateText( "00:00:00" );
    txtDur.SetTextSize( 16 );
    txtDur.SetTextColor( "#dddddd" );
    txtDur.SetTextShadow( 20, 5,10, "#aa000000" );
    layTime.AddChild( txtDur );
    
    flipBtn = app.CreateButton( "[fa-expand]", -1, -1, "Custom,FontAwesome" );
    flipBtn.SetTextSize( 22 );
    flipBtn.SetMargins( 0.42, 0.0, 0.0, 0.0 );
    flipBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    flipBtn.SetBackColor( "#00000000" );
    flipBtn.SetOnTouch( flipBtn_OnTouch ); 
    controlVP_V.AddChild( flipBtn ); 
    controlVP_H.AddChild( flipBtn ); 


  	//Create a horizontal layout for icon buttons. 
    layBut = app.CreateLayout("Linear", "Horizontal"); 
    controlVP_V.AddChild( layBut ); 
    controlVP_H.AddChild( layBut ); 
    
    backBtn = app.CreateButton( "[fa-backward]", -1, -1, "Custom,FontAwesome" );
    backBtn.SetTextSize( 22 );
    backBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    backBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    backBtn.SetBackColor( "#00000000" );
    backBtn.SetOnTouch( backBtn_OnTouch ); 
    layBut.AddChild( backBtn ); 
    
    playBtn = app.CreateButton( "[fa-pause]", -1, -1, "Custom,FontAwesome" );
    playBtn.SetTextSize( 22 );
    playBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    playBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    playBtn.SetBackColor( "#00000000" );
    playBtn.SetOnTouch( playBtn_OnTouch ); 
    layBut.AddChild( playBtn ); 
    
    forwardBtn = app.CreateButton( "[fa-forward]", -1, -1, "Custom,FontAwesome" );
    forwardBtn.SetTextSize( 22 );
    forwardBtn.SetMargins( 0.05, 0.01, 0.05, 0.0 );
    forwardBtn.SetStyle( "#9900afff", "#9900afff", 50, "#00000000", 0, 0);
    forwardBtn.SetBackColor( "#00000000" );
    forwardBtn.SetOnTouch( forwardBtn_OnTouch ); 
    layBut.AddChild( forwardBtn ); 
    
    
  //Start timer to update seek bar every second.
	setInterval( "VidUpdate()", 1000 );
	controlVP_V.Show();
	//dlgVP.Show();
	dur = null;
	
	
	// 1.0,  0.93476146, 1080×1920   1080×2132
	//Determine Display Width and Height
  Sw = app.GetDisplayWidth(  );
	Sh = app.GetDisplayHeight(  );
	//Determine initial/true width and height of video in portrait mode.
	Lw = player.GetAbsWidth();
  Lh = player.GetAbsHeight();
  
}


function player_OnReady()
{
  app.HideProgress();
  player.Play();
}

function player_OnError()
{
  app.HideProgress();
  app.ShowPopup( "Error" );
}

function controlVP_OnTouch()
{
  //Controll Panel Hide.
  controlVP_V.Hide();
}

function layVP_OnTouch()
{
  //Control Panel Show.
  controlVP_V.Show();
}

function VidUpdate()
{ //Determining running time of the video. (secs to H:mm:ss convert)
  prog = player.GetPosition();
  posTime = moment.utc( prog* 1000).format('HH:mm:ss');
  txtPos.SetText( posTime );
  //Determining duration of the video.(secs to H:mm:ss convert)
  dur = player.GetDuration();
  durTime = moment.utc( dur* 1000).format('HH:mm:ss');
  txtDur.SetText( durTime );
  
  if( dur ) { skb.SetValue( prog / dur ); } //Set seekbar position.
  if( player.IsPlaying() ) { forwardBtn.SetEnabled( true ); } //Enable forward button while playing.
 
}

//Called when user touches the seek bar.
function skb_OnTouch( value )
{
	player.SeekTo( dur * value ); //Seekbar control.
	if( value != 1.0 ) forwardBtn.SetEnabled( true ); // Enable forward button except seekbar at max.
}


function playBtn_OnTouch()
{ //play or pause button control.
 if( player.IsPlaying() ) 
          { 
            player.Pause();
            playBtn.SetText( "[fa-play]" ); 
          }
  else 
          {
            player.Play();
            playBtn.SetText( "[fa-pause]" );
          }
}


function forwardBtn_OnTouch()
{
  player.SeekTo( prog + 10 ); //+10 sec forward
}

function backBtn_OnTouch()
{
  player.SeekTo( prog - 10 ); //-10 sec backward
}

//Called when playback has finished.
function player_OnComplete()
{
	playBtn.SetText( "[fa-play]" );
	forwardBtn.SetEnabled( false ); //Disable forward button at video finised.
}

function flipBtn_OnTouch()
{ //Set orientation on flipBtn_OnTouch and callback.
  if( app.GetOrientation() == "Portrait" ) 
      { OnFlipH();  }
  else OnFlipV();
}

function OnFlipH() //Landscape mode (H)
{   //Determine scale factor for difrerent size of video portrait(Lh > Sw) and Landscape(Lh < Sw).
    app.SetOrientation( "Landscape" );
    if( Lh > Sw ) Hf = player.GetAbsHeight()/Sw;
    else Hf = Sw/player.GetAbsHeight();
    //####ISSUE####: WORKING OF VIDEO SCALING 
    // WITHOUT ASSINING VALUES TO player.SetSize();
    // IS UNCLEAR; ?????
    player.SetSize(  1.0,  1.0 );
    
    //Re-positioning control components.
    CancelBtn.SetMargins( 0.46, 0.0, 0.0, 0.0 );
    layTime.SetMargins( 0.01, 0.47, 0.01, 0.0 );
    flipBtn.SetMargins( 0.45, 0.0, 0.0, 0.0 );
    skb.SetSize( 0.8 );
   
}


function OnFlipV() //Portrait mode (V)
{  
    app.SetOrientation( "Portrait" );
    //Re-Scaling for portrait mode.
    Vw = Sw/player.GetAbsWidth(); // width ratio.
    Vhpx = player.GetAbsHeight() * Vw; //Height pixel.
    Vh = Vhpx/Sh; //height ratio.
    Vf = (Sh/app.GetDisplayHeight()); //Scale factor.
    player.SetSize( 1.0, 1.0 ); //??????
    
    //Re-positioning control components.
    CancelBtn.SetMargins( 0.43, 0.0, 0.0, 0.0 );
    layTime.SetMargins( 0.01, 0.7, 0.01, 0.0 );
    flipBtn.SetMargins( 0.42, 0.0, 0.0, 0.0 );
    skb.SetSize( 0.6 );
   
}


function CancelBtn_OnTouch()
{ 
  player.Stop();
  vpMain.Dismiss();
  app.SetOrientation( "Portrait" );
}
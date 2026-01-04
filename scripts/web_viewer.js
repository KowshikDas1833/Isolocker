function web_viewer()
{ 
   web_vw = app.CreateDialog( );
   web_vw.SetSize( 1.0, -1.0 );
   web_vw.SetBackColor( "#000000" );
   
  //app.SetOrientation( "Portrait" );
  web_lay = app.CreateLayout( "linear", "Center,FillXY" );
  
    //Create a button.
    web_close = app.CreateButton( "[fa-close]", -1, -1, "Custom,FontAwesome"  );
    web_close.SetMargins( 0.42, 0.0, 0, 0 );
    web_close.SetStyle( "#000000", "#000000" , 0);
    web_close.SetTextSize( 26 );
    web_close.SetOnTouch( web_close_OnTouch );
    web_lay.AddChild( web_close );
    
 
   web_pg = app.CreateWebView( 1.0, -1.0, "AllowZoom,wide" );
   web_pg.SetBackColor( "#ffffff" );
   web_lay.AddChild( web_pg );  
   
   
   web_vw.AddLayout( web_lay );
   
   web_pg.LoadUrl( "file://"+directory );
   
   web_vw.Show();
   //app.ShowPopup( web_pg.GetUrl() );
   
}


//Called when user touches our button.
function web_close_OnTouch()
{
   web_vw.Dismiss();
}
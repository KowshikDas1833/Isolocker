function image_viewer()
{  iv_file = directory;
   img_fldrNx = iv_file.lastIndexOf("/");
   img_fldr = iv_file.substring( 0, img_fldrNx );
   img_title = iv_file.substring( img_fldrNx+1, iv_file.length )
   //app.ShowPopup(  );
   //app.ShowPopup( img_title );
     iv_list = app.ListFolder( img_fldr, ".jpg" );
     iv_list += ","+app.ListFolder( img_fldr, ".png" );
     iv_list += ","+app.ListFolder( img_fldr, ".jpeg" );

     //Replace ",," with "," if no .jpg and .png file exists.
     if ( iv_list.indexOf(",,")>-1 ) { iv_list = iv_list.replace( new RegExp(',,', "g"), ',' ); }
     iv_list = iv_list.split( "," );
     img_Indx = iv_list.indexOf( img_title );
     //app.ShowPopup( iv_list.length );

   
   img_vw = app.CreateDialog( );
   img_vw.SetSize( 1.0, -1.0 );
   img_vw.SetBackColor( "#000000" );
   
  //app.SetOrientation( "Portrait" );
  iv_lay = app.CreateLayout( "linear", "Center,FillXY" );
 
    //Create a button.
    iv_close = app.CreateButton( "[fa-close]", -1, -1, "Custom,FontAwesome"  );
    iv_close.SetMargins( 0.42, 0.0, 0, 0 );
    iv_close.SetStyle( "#000000", "#000000" , 0);
    iv_close.SetTextSize( 26 );
    iv_close.SetOnTouch( iv_close_OnTouch );
    iv_lay.AddChild( iv_close );

   iv_web = app.CreateWebView( 1.0, 0.8, "AllowZoom,NoScrollBars" );
   iv_web.SetBackColor( "#00000000" );
   iv_lay.AddChild( iv_web );
   
   
   //app.ShowPopup( iv_web.GetWidth()+"  "+ iv_web.GetHeight()  );
   
   //Create a horizontal layout for icon buttons. 
    iv_layBut = app.CreateLayout("Linear", "Horizontal"); 
    iv_lay.AddChild( iv_layBut ); 
    
    //Button with previous image
    prev_btn = app.CreateButton( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx-1]+"'</big>", 0.2, 0.1, "Html" );
    prev_btn.SetTextSize( 24 );
    prev_btn.SetOnTouch( prev_btn_OnTouch );
    //btn.SetPadding( 0.03, 0.02, 0.03, 0.02 );
    prev_btn.SetMargins( 0, 0.03, 0, 0 );
    iv_layBut.AddChild( prev_btn );
    
    //Button with current image
    now_btn = app.CreateButton( "<big><img src='"+iv_file+"'</big>", 0.2, 0.1, "Html" );
    now_btn.SetTextSize( 28 );
    now_btn.SetBackColor( "#4285F4" );
    //btn.SetPadding( 0.03, 0.02, 0.03, 0.02 );
    now_btn.SetMargins( 0, 0.03, 0, 0 );
    iv_layBut.AddChild( now_btn );
    
    //Button with next image   
    next_btn = app.CreateButton( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx+1]+"'</big>", 0.2, 0.1, "Html" );
    next_btn.SetTextSize( 24 );
    next_btn.SetOnTouch( next_btn_OnTouch );
    //btn.SetPadding( 0.03, 0.02, 0.03, 0.02 );
    next_btn.SetMargins( 0, 0.03, 0, 0 );
    iv_layBut.AddChild( next_btn );
	
   img_vw.AddLayout( iv_lay );
 
   //img_file = "/storage/emulated/0" + iv_file.toString().slice( 15 );
  //app.ShowPopup( img_file );
  
          img_web = "<html><head><style>";
          img_web += "body {display: grid; place-items: center;  margin: 0;}";
          img_web += "img { max-width: 100%; max-height: 100%; object-fit: contain; }";
          img_web += "</style> </head> <body>";
          img_web += "<img src='"+ iv_file +"' alt='Failed to load'>";
          img_web += "</body></html>";
   iv_web.LoadHtml( img_web, "file:" );
   
   img_vw.Show();
  
  //Problem: Index mismatching for iv_list += items 
   if( iv_list[img_Indx-1] == "" || iv_list[img_Indx-1] == null ) prev_btn.SetEnabled( false );
   else prev_btn.SetEnabled( true );
   //Problem: Index mismatching for iv_list += items
   if( iv_list[img_Indx+1] == null || iv_list[img_Indx+1] == "") next_btn.SetEnabled( false );
   else next_btn.SetEnabled( true ); 
   
}


//Called when user touches our button.
function iv_close_OnTouch()
{
   img_vw.Dismiss();
}

function iv_lay_OnTouch()
{
   app.ShowPopup( "yoo" );
}

function prev_btn_OnTouch()
{
  next_btn.SetEnabled( true );
  img_Indx = img_Indx-1;
  iv_file = img_fldr+"/"+ iv_list[img_Indx];
  img_web = "<html><head><style>";
          img_web += "body {display: grid; place-items: center;  margin: 0;}";
          img_web += "img { max-width: 100%; max-height: 100%; object-fit: contain; }";
          img_web += "</style> </head> <body>";
          img_web += "<img src='"+iv_file+"' alt='Failed to load'>";
          img_web += "</body></html>";
   iv_web.LoadHtml( img_web, "file:" );
   now_btn.SetHtml( "<big><img src='"+iv_file+"'</big>"  );
   prev_btn.SetHtml( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx-1]+"'</big>" );
   next_btn.SetHtml( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx+1]+"'</big>" );
   //app.ShowPopup( iv_list[img_Indx-1] );
   //Problem: Index mismatching for iv_list += items
   if( iv_list[img_Indx-1] == "" || iv_list[img_Indx-1] == null ) prev_btn.SetEnabled( false );
   else prev_btn.SetEnabled( true );
}


function next_btn_OnTouch()
{ 
  prev_btn.SetEnabled( true );
  img_Indx = img_Indx+1;
  iv_file = img_fldr+"/"+ iv_list[img_Indx];
  img_web = "<html><head><style>";
          img_web += "body {display: grid; place-items: center;  margin: 0;}";
          img_web += "img { max-width: 100%; max-height: 100%; object-fit: contain; }";
          img_web += "</style> </head> <body>";
          img_web += "<img src='"+iv_file+"' alt='Failed to load'>";
          img_web += "</body></html>";
   iv_web.LoadHtml( img_web, "file:" );
   now_btn.SetHtml( "<big><img src='"+iv_file+"'</big>"  );
   prev_btn.SetHtml( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx-1]+"'</big>" );
   next_btn.SetHtml( "<big><img src='"+img_fldr+"/"+ iv_list[img_Indx+1]+"'</big>" );
   //app.ShowPopup( iv_list[img_Indx+1]  );
   //Problem: Index mismatching for iv_list += items
   if( iv_list[img_Indx+1] == null || iv_list[img_Indx+1] == "") next_btn.SetEnabled( false );
   else next_btn.SetEnabled( true );
}
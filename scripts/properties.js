//Called when user touches our button.
function Properties(directory)
{
    //Create dialog window.
    prop_dlg = app.CreateDialog( "Properties" );
    prop_dlg.SetSize( 0.9, 0.45 );
    
    //Create a layout with objects vertically centered.
	prop_lay = app.CreateLayout( "linear", "Top,Center,FillXY" );
	prop_lay.SetPadding( 0.0, 0.01, 0.0, 0 );	
	prop_dlg.AddLayout( prop_lay );
  
  file_name = directory.substring( directory.lastIndexOf( "/" )+1, directory.length);
  file_size = app.GetFileSize( directory );
  file_date = file_date =moment(app.GetFileDate( directory )).local().format('ddd, MMM D, YYYY h:mm A');
  //app.ShowPopup( formatSize() )
  
  //Create image 1/5 of screen width and correct aspect ratio.
	prop_img = app.CreateImage( "drawable/file.png", 0.2, -1 );
	//prop_img.SetPadding( 0,0.01,0,0 );
	prop_lay.AddChild( prop_img );


	      if( file_name.slice(-4) == ".txt" ) { prop_img.SetImage( "drawable/text.png"); }
       else if( file_name.slice(-5) == ".html" ) { prop_img.SetImage( "drawable/web.png"); }
       else if( file_name.slice(-6) == ".mhtml" ) { prop_img.SetImage( "drawable/web.png"); }
       else if( file_name.slice(-4) == ".mht" ) { prop_img.SetImage( "drawable/web.png"); }
       else if( file_name.slice(-4) == ".mp4" ) { prop_img.SetImage("drawable/video.png" ); }
       else if( file_name.slice(-4) == ".mp3" ) { prop_img.SetImage("drawable/audio.png" ); }
       else if( file_name.slice(-4) == ".png" ) { prop_img.SetImage( directory); }
       else if( file_name.slice(-4) == ".jpg" ) { prop_img.SetImage( directory); }
else if( file_name.slice(-5) == ".jpeg" ) { prop_img.SetImage( directory); }
       else if( file_name.slice(-4) == ".xml" ) { prop_img.SetImage("drawable/script.png"); }
       else if( file_name.slice(-3) == ".js" ) { prop_img.SetImage("drawable/script.png"); }
       else if( file_name.slice(-5) == ".docx" ) { prop_img.SetImage("drawable/doc.png"); }
       else if( file_name.slice(-4) == ".pdf" ) { prop_img.SetImage( "drawable/book.png"); }

       else 
                 {   prop_img.SetImage( "drawable/file.png" );  }
	
	//Create a file name label with icon.
	name_txt = app.CreateText( "File: "+file_name, 0.8, -1, "FontAwesome, Left, Multiline, AutoScale" );
	name_txt.SetTextSize( 18 );
	//name_txt.SetPadding( 0,0.01,0,0 );
	name_txt.SetMargins( 0.01, 0.02, 0.01, 0.01 );
	prop_lay.AddChild( name_txt );
	
	//Create a file name label with icon.
	size_txt = app.CreateText( "Size: " + Size(directory), 0.8, -1, "FontAwesome, Left,Multiline, AutoScale" );
	size_txt.SetTextSize( 14 );
	//name_txt.SetPadding( 0,0.01,0,0 );
	size_txt.SetMargins( 0.06, 0.0, 0.01, 0.01 );
	prop_lay.AddChild( size_txt );
	
	//Create a file name label with icon.
	date_txt = app.CreateText( "Date: " + file_date, 0.8, -1, "FontAwesome, Left,Multiline, AutoScale" );
	date_txt.SetTextSize( 16 );
	//name_txt.SetPadding( 0,0.01,0,0 );
	date_txt.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	prop_lay.AddChild( date_txt );
	
    
    //Show dialog.
    prop_dlg.Show();
}


function Size(directory)
{
   var file_sz =app.GetFileSize(directory);
   var con_sz = "";
   
   if(file_sz<1024)
     { con_sz=file_sz.toFixed(2)+"B" }
   else if(file_sz<Math.pow(1024,2))
     { con_sz=(file_sz/Math.pow(1024,1)).toFixed(2)+"KB" }
   else if(file_sz<Math.pow(1024,3))
     { con_sz=(file_sz/Math.pow(1024,2)).toFixed(2)+"MB" }
   else if(file_sz<Math.pow(1024,4))
     { con_sz=(file_sz/Math.pow(1024,3)).toFixed(2)+"GB" }
   else if(file_sz<Math.pow(1024,5))
     { con_sz=(file_sz/Math.pow(1024,4)).toFixed(2)+"TB" }
   else { con_sz=(file_sz/Math.pow(1024,4)).toFixed(2)+"TB" }
   
    return con_sz;
}
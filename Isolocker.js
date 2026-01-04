/* Copyright (c) 2025 Kowshik Das */




//Load Plugin for time conversion.
app.LoadPlugin( "Moment" );
//Set orientation
app.SetOrientation( "Portrait" );


//Text Editor variables
var rmnNdx = 0;

//Settings variables
var days;
var daysChkdTxt = app.LoadText( "DaysChecked", "true,true,true,true,true,true,true" );
var daysChkd = daysChkdTxt.split( "," );



app.LoadScript( "scripts/properties.js" );
app.LoadScript( "scripts/nameBox.js"  );
app.LoadScript( "scripts/move.js"  );
app.LoadScript( "scripts/video_player.js"  );
app.LoadScript( "scripts/image_viewer.js"  );
app.LoadScript( "scripts/web_viewer.js"  );
app.LoadScript( "scripts/audio_player.js"  );
app.LoadScript( "scripts/text_editor.js"  );



var main_directory = app.GetPrivateFolder( "Isolocker" );
var vidThumb = app.GetPrivateFolder( "vidThumb" );
//var main_directory = "/data/user/0/com.smartphoneremote.androidscriptfree";
var directory;
var current_folder = "Isolocker";
var prev_folder;
var fileName;

var storage = "/sdcard";
var movePath;
var move_folder;
var mvOut_fldr;
var prev_mvFolder;


function OnStart()
{
  
  ///////////////////ENTER PASSWORD/////////////
  //Create dialog window.
    dlgPass = app.CreateDialog( null, "NoCancel");
    dlgPass.SetOnBack( passBack );
    dlgPass.SetSize( 1.0, 1.0 );
    
    
    //Create a layout for dialog.
    layPass = app.CreateLayout( "linear", "VCenter,FillXY,left" );
    layPass.SetPadding( 0.02, 0, 0.02, 0.02 );
    dlgPass.AddLayout( layPass );
    
    //Create some text.
    txtEnter = app.CreateText( "Enter Password:" );
    txtEnter.SetTextSize( 22 );
    layPass.AddChild( txtEnter );

  edtEnter = app.CreateTextEdit( "", 1.0, -1.0, "Password");
  edtEnter.SetOnEnter( edtEnter_OnEnter );
  //edtEnter.SetOnChange( edtEnter_OnChange );
  edtEnter.SetHint( "Password" );
  //edtEnter.SetOn
  layPass.AddChild( edtEnter );
  
  //Show dialog.
    dlgPass.Show();
    
 /////////////////////////////////////////
  
  
  
  lay = app.CreateLayout( "Linear", "Top,Center,FillXY" );
  
  //Create a horizontal layout for icon buttons. 
    layMenu = app.CreateLayout("Linear", "Horizontal"); 
    //layMenu.SetMargins( 0.18, 0.0, 0.0, 0.0 );
    lay.AddChild( layMenu ); 
    
    //Create menu button.
        menu_btn = app.CreateButton( "[fa-ellipsis-v]"/*menu_btns[i]*/, -1, -1, "FontAwesome,Custom" ); 
        menu_btn.SetMargins( 0.82, 0.0, 0.0, 0.0 );
        menu_btn.SetTextSize( 26 ); 
        menu_btn.SetStyle( "#000000", "#000000" , 0);
        menu_btn.SetOnTouch( menu_OnTouch ); 
        layMenu.AddChild( menu_btn ); 
  
  
  folder_name  = app.CreateText( "Isolocker" );
  folder_name.SetTextSize( 14 );
  lay.AddChild( folder_name );
  
  directory = main_directory;
  //var list =  app.ListFolder( directory );
  lst = app.CreateList( "", 1.0, -1 );
  lst.SetOnTouch( lst_OnTouch );
  lst.SetOnLongTouch( lst_OnLongTouch );
  lay.AddChild( lst );

  //app.ShowPopup( list );
  app.AddLayout( lay );
  app.EnableBackKey( false );
  
  app.ShowProgress( "Loading..."  );
  OnList();
    
}

///////////////////// ON ENTER //////////////////
function edtEnter_OnEnter()
{
   pass = app.LoadText( "MyPass", "1234" );
   
   if( pass == edtEnter.GetText() ) 
      {   var d = new Date();
          if( daysChkd[d.getDay()] == "true" ) dlgPass.Dismiss();
	        else app.ShowPopup( "Not Today" );
      }
   else app.ShowPopup( "Wrong password", "Short");
}

//Called when the back key is pressed.
function passBack() 
{             
	app.Exit();
}



////////////////////LIST//////////////////////
function lst_OnTouch( title, body, type, index )
{
  directory = directory + "/" + title;
  prev_folder = title;
  
  if(app.IsFolder( directory ) )
          { 
                 folder_name.SetText( title );
                 current_folder = title;
                 lst.RemoveAll();
                 //lst.SetList(app.ListFolder( directory ) );
                 app.ShowProgress( "Loading..." );
                 OnList();  
           }
  
  else 
           {    OpenFile();
                 directory = directory.replace( "/"+title, "");
                 fileName = title;
            }
}

function OnBack()
{
  if ( current_folder == "Isolocker" || current_folder == "app_Isolocker" ) 
           {
              var exit = app.CreateYesNoDialog( "Exit App?" );
              exit.SetOnTouch( exit_OnTouch );
              exit.Show();
           }
  else {     
                 directory = directory.replace( "/" + current_folder, "" );
                 index_of_folder = directory.lastIndexOf( "/" );
                 current_folder = directory.substring( index_of_folder+1, directory.length);
                 if( current_folder == "app_Isolocker" ) folder_name.SetText( "Isolocker" );
                 else folder_name.SetText( current_folder  );
                 //app.ShowPopup( current_folder );
                 lst.RemoveAll();
                 //lst.SetList(app.ListFolder( directory ) ); 
                 app.ShowProgress( "Loading..." );
                 OnList();
           }
   lst.ScrollToItem( prev_folder );
  
}


function OnList()
{ 
   //lst.SetList(app.ListFolder( directory ) );
   
Items = app.ListFolder(directory);//.toString().split(","); 

for ( i=0; i<Items.length; i++) 
  { 
       if( app.IsFolder( directory + "/" + Items[i] )) 
                {
                       if( Items[i] == "" ) { lst.RemoveAll(); }
                       else {  lst.AddItem( Items[i], app.ListFolder(directory + "/" + Items[i]).length + " item", "Folder");  }
   } 
       else if( Items[i].slice(-4) == ".txt" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/text.png"); }
       else if( Items[i].slice(-5) == ".html" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/web.png"); }
       else if( Items[i].slice(-6) == ".mhtml" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/web.png"); }
       else if( Items[i].slice(-4) == ".mht" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/web.png"); }
       else if( Items[i].slice(-4) == ".mp4" ) 
       { 
           app.GetThumbnail(directory + "/" + Items[i], vidThumb +"/"+ Items[i].substring( 0, Items[i].length-4 ) +".jpg" );
           lst.AddItem( Items[i], formatSize(Items[i]), vidThumb +"/"+ Items[i].substring( 0, Items[i].length-4 ) +".jpg" ); // 
        }
       else if( Items[i].slice(-4) == ".mp3" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/audio.png"); }
       else if( Items[i].slice(-4) == ".png" ) { lst.AddItem( Items[i], formatSize(Items[i]), directory + "/" + Items[i]); }
       else if( Items[i].slice(-4) == ".jpg" ) { lst.AddItem( Items[i], formatSize(Items[i]), directory + "/" + Items[i]); }
       else if( Items[i].slice(-5) == ".jpeg" ) { lst.AddItem( Items[i], formatSize(Items[i]), directory + "/" + Items[i]); }
       else if( Items[i].slice(-4) == ".xml" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/script.png"); }
       else if( Items[i].slice(-3) == ".js" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/script.png"); }
       else if( Items[i].slice(-5) == ".docx" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/doc.png"); }
       else if( Items[i].slice(-4) == ".pdf" ) { lst.AddItem( Items[i], formatSize(Items[i]), "drawable/book.png"); }
       else 
                 {   lst.AddItem( Items[i], formatSize(Items[i]), "drawable/file.png");  }

    }

app.HideProgress();
}


function formatSize(Items)
{
var sz =app.GetFileSize(directory + "/" + Items);
var nsz = ""

if(sz<1024)
   {  nsz=sz.toFixed(2)+" B" }
else if(sz<Math.pow(1024,2))
    { nsz=(sz/Math.pow(1024,1)).toFixed(2)+" KB" }
else if(sz<Math.pow(1024,3))
    { nsz=(sz/Math.pow(1024,2)).toFixed(2)+" MB" }
else if(sz<Math.pow(1024,4))
    { nsz=(sz/Math.pow(1024,3)).toFixed(2)+" GB" }
else if(sz<Math.pow(1024,5))
    { nsz=(sz/Math.pow(1024,4)).toFixed(2)+" TB" }
else { nsz=(sz/Math.pow(1024,4)).toFixed(2)+" TB" }

return nsz
}


function OpenFile()
{
   
       if( directory.slice(-4) == ".txt" ) { text_editor(); }
       else if( directory.slice(-5) == ".html" ) { web_viewer(); }
       else if( directory.slice(-6) == ".mhtml" ) { web_viewer(); }
       else if( directory.slice(-4) == ".mht" ) { web_viewer(); }
       else if( directory.slice(-4) == ".mp4" ) { video_player();  }
       else if( directory.slice(-4) == ".mp3" ) { audio_player() }
       else if( directory.slice(-4) == ".png" ) { image_viewer(); }
       else if( directory.slice(-4) == ".jpg" ) { image_viewer(); }
       else if( directory.slice(-5) == ".jpeg" ) { image_viewer(); }
       else if( directory.slice(-4) == ".xml" ) { text_editor(); }
       else if( directory.slice(-3) == ".js" ) { text_editor(); }
       else if( directory.slice(-5) == ".docx" ) { app.ShowPopup( "Not supported"); }
       else if( directory.slice(-4) == ".pdf" ) { app.ShowPopup( "Not supported"); }
       else 
                 {   app.ShowPopup( "Not supported" );  }
   
}


function exit_OnTouch( result )
{
  if( result=="Yes" ) 
     { app.DeleteFolder( vidThumb ); app.Exit(); }
}


function lst_OnLongTouch( title, body, type, index ) 
{
    //app.ShowPopup( directory + "/" + title );
    //app.SetClipboardText( directory + "/" + title  );
    fileName = title;
   
    //opt_list = "[fa-info] Properties, [fa-trash] Delete";
    if( app.IsFolder( directory + "/" + title )) opt_list = "Rename:folder,Move:drawable/moveFile.png,Move to local storage:drawable/unlock.png,Delete:drawable/delete.png"; 
    else  opt_list = "Rename:folder,Move:drawable/moveFile.png,Move to local storage:drawable/unlock.png,Properties:drawable/info.png,Delete:drawable/delete.png"; 
    
   //Create dialog window.l
    opt_dlg = app.CreateDialog( );
    
    //Create a layout for dialog.
    opt_layDlg = app.CreateLayout( "linear", "vertical,fillxy" );
   // layDlg.SetPadding( 0.02, 0, 0.02, 0.02 );
    opt_dlg.AddLayout( opt_layDlg );

    //Create a list control.
    opt_lstDlg = app.CreateList( opt_list, 0.9, -1.0, "FontAwesome" );
    //opt_lstDlg.SetTextSize( 22 );
    //lstDlg.SetTextColor( "#dddddd" );
    opt_lstDlg.SetOnTouch( opt_lst_OnTouch );
    opt_layDlg.AddChild( opt_lstDlg );
    
    //Show dialog.
    opt_dlg.Show();
   
}


//Handle list item selection.
function opt_lst_OnTouch( item )
{
    //Hide the dialog window.
    opt_dlg.Hide();
    
    if( item == "Properties" ) {Properties(directory + "/" + fileName); }
    else if( item == "Delete" ) { delete_OnTouch(); }
    else if( item == "Rename" ) { typ = "Rename"; nameBox( typ ); }
    else if( item == "Move" )
               {  mvTyp = "Move";
                  movePath = main_directory;
                  move_fldr( mvTyp ); }
    else if( item == "Move to local storage" )
                { mvTyp = "Move to local storage";
                   movePath = storage;
                   move_fldr( mvTyp ); }
}


function delete_OnTouch()
{
  //app.ShowPopup( directory+ "/" + fileName );
  delete_dlg = app.CreateYesNoDialog( "Are you sure to delete "+fileName+" ?" );
  delete_dlg.SetOnTouch( delete_dlg_OnTouch );
  delete_dlg.Show();
}

function delete_dlg_OnTouch( result )
{
  if( result=="Yes" )  
  { if( app.IsFolder(directory + "/" + fileName )) app.DeleteFolder( directory + "/" + fileName );
     else app.DeleteFile( directory + "/" + fileName ); 
     lst.RemoveItem( fileName ); 
     app.ShowPopup( fileName+" deleted" );
  }
}


///////// MENU /////////
//Called when user touches menu button.
function menu_OnTouch()
{
    //Create dialog window.
    menu_dlg = app.CreateDialog( null);
    menu_dlg.SetSize( 1.0, 1.0 );
    menu_dlg.SetBackColor( "#40000000" );
    
    //Create a layout for dialog.
    menu_layDlg = app.CreateLayout( "linear", "vertical,fillxy" );
   // layDlg.SetPadding( 0.02, 0, 0.02, 0.02 );
    menu_layDlg.SetOnTouchDown( menu_layDlg_OnTouch );
    menu_dlg.AddLayout( menu_layDlg );

    //Create a list control.
    menu_list = "[fa-plus] New folder, [fa-file] Attach file, [fa-folder-open] Attach folder, [fa-cog] Settings";
    menu_lstDlg = app.CreateList( menu_list, 0.5, -1.0, "FontAwesome" );
    menu_lstDlg.SetMargins( 0.23, 0.05, 0.01, 0.01 );
    menu_lstDlg.SetTextSize( 22 );
    menu_lstDlg.SetBackColor( "#000000" );
    menu_lstDlg.SetOnTouch( menu_lst_OnTouch );
    menu_layDlg.AddChild( menu_lstDlg );
    
    //Show dialog.
    menu_dlg.Show();
}

//Handle list item selection.
function menu_lst_OnTouch( item )
{
    //Hide the dialog window.
    menu_dlg.Hide();
    
    //On select menu list's item.
    if( item.slice(2) == "Attach file" ) app.ChooseFile( "Choose a file", "*/*", OnFileChoose );
    else if( item.slice(2) == "New folder" ) { typ = "nFldr";  nameBox( typ ); }
    else if( item.slice(2) == "Attach folder" ) 
                { mvTyp = "Attach Folder";
                  movePath = storage;
                  move_fldr( mvTyp ); }
    else if( item.slice(2) == "Settings" ) Settings();
    
}


function menu_layDlg_OnTouch()
{
   menu_dlg.Dismiss();
}

///////////////////


//Called when a file is chosen.
function OnFileChoose( choosedFile )
{
    //app.ShowPopup( choosedFile );
    index_of_folder = choosedFile.lastIndexOf( "/" );
    choosedFile_Name = choosedFile.substring( index_of_folder+1, choosedFile.length);
    app.CopyFile( choosedFile, directory + "/" + choosedFile_Name );
    //
    if( app.LoadBoolean( "delFromStorage", true ) ) app.DeleteFile( choosedFile );
    lst.RemoveAll();
    OnList();
    app.ShowPopup( choosedFile_Name+" is moved to Isolocker" );
}

/////////////////



///////////////// SETTINGS /////////////////

//Called when user touches our button.
function Settings()
{
    //Create dialog window.
    dlgSett = app.CreateDialog( "Settings" );
    dlgSett.SetSize( 1.0, -1.0 );
    dlgSett.SetBackColor( "#000000" );
    
    //Create a layout for dialog.
    laySett = app.CreateLayout( "Linear", "Vertical,FillXY" );
    dlgSett.AddLayout( laySett );

    //Create a list control.
    var listSett = "Set Password:Set password for security:null";
    listSett += ",Schedule day to active:Isolocker will only activate at selected days:null";
    
    lstSett = app.CreateList( listSett, 1.0, -1.0 );
    lstSett.SetTextSize( 18 );
    lstSett.SetTextColor( "#dddddd" );
    lstSett.SetOnTouch( lstSett_OnTouch );
    laySett.AddChild( lstSett );
    
    //Create a layout for dialog.
    layD1 = app.CreateLayout( "linear", "horizontal,left" );
    layD1.SetMargins( 0.01, 0.05, 0.05, 0.01 );
    laySett.AddChild( layD1 );
    
    //Create some text.
    txtD1 = app.CreateText( "Delete from storage after attached" );
    txtD1.SetTextSize( 18 );
    layD1.AddChild( txtD1 );
    
    //Create a check box.
    chkDS = app.CreateCheckBox( "" );
    chkDS.SetMargins( 0.058, 0, 0, 0 );
    chkDS.SetOnTouch( chkDS_OnTouch );
    layD1.AddChild( chkDS );
    
    chkdDS = app.LoadBoolean( "delFromStorage", true );
    chkDS.SetChecked( chkdDS );
    
    //Create a layout for dialog.
    layD2 = app.CreateLayout( "linear", "horizontal,left" );
    layD2.SetMargins( 0.01, 0.01, 0.05, 0.01 );
    laySett.AddChild( layD2 );
    
    //Create some text.
    txtD2 = app.CreateText( "Delete from Isolocker after removed" );
    txtD2.SetTextSize( 18 );
    layD2.AddChild( txtD2 );
    
    //Create a check box.
    chkDD = app.CreateCheckBox( "" );
    chkDD.SetMargins( 0.01, 0, 0, 0 );
    chkDD.SetOnTouch( chkDD_OnTouch );
    layD2.AddChild( chkDD );
    
    chkdDD = app.LoadBoolean( "delFromIsolocker", false );
    chkDD.SetChecked( chkdDD );
    
    lstME = app.CreateList( "[fa-info-circle] About me,[fa-copyright] Open Source License", 1.0, 0.25, "FontAwesome" );
	  lstME.SetTextSize( 20 );
	  lstME.SetMargins( 0.01, 0.03, 0.01, 0.01 );
	  lstME.SetOnTouch( lstME_OnTouch );
    laySett.AddChild( lstME );
    
    //Show dialog.
    dlgSett.Show();
    
}

//Handle list item selection.
function lstSett_OnTouch( item )
{
    //Set on select item.
    if( item == "Schedule day to active" ) SelectDays();
    else if( item == "Set Password" ) ChangePassword();
    
}

function SelectDays()
{
  //Create dialog window.
    dlgDays= app.CreateDialog( "Days" );
    dlgDays.SetSize( 0.85, 0.6 );
    //dlgDays.SetOnBack( passBack );
    dlgDays.SetOnCancel( dlgDays_OnCancel );
    
    //Create a layout for dialog.
    layDays = app.CreateLayout( "linear", "vertical,fillxy,left" );
    //layDays.SetPadding( 0.02, 0, 0.02, 0.02 );
    dlgDays.AddLayout( layDays );
    
    //Create an array of icon buttons. 
    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    for( var i=0; i<days.length; i++ )
    {
          chkDays = app.CreateCheckBox( days[i] );
          chkDays.select = days[i];
          chkDays.SetMargins( 0.02, 0.02, 0.01, 0.01 );
          chkDays.SetChecked( daysChkd[i]  );
          chkDays.SetOnTouch( chkDays_OnSelect );
          layDays.AddChild( chkDays );
          
    }
    
    //Show dialog.
    dlgDays.Show();
}


function chkDays_OnSelect( isCkhd )
{
  //app.ShowPopup( this.select +"  "+ isCkhd +" "+ days.indexOf(this.select) );
  itemCkhd = days.indexOf(this.select);
  daysChkd[itemCkhd] = isCkhd;
  daysChkdTxt = daysChkd;
  app.SaveText( "DaysChecked", daysChkdTxt );
}

function dlgDays_OnCancel()
{
  if( daysChkdTxt == "false,false,false,false,false,false,false" )
  {
      app.ShowPopup( "Operation failed: At least one day need to be selected" );
      daysChkdTxt == "true,true,true,true,true,true,true";
      app.SaveText( "DaysChecked", daysChkdTxt );
  }
}

function chkDS_OnTouch( isChkd )
{
   app.SaveBoolean( "delFromStorage", isChkd );
}

function chkDD_OnTouch( isChkd )
{
   app.SaveBoolean( "delFromIsolocker", isChkd );
}

//Handle list item selection.
function lstME_OnTouch( item )
{  
    //Set on select item.
    if( item.slice(2) =="Open Source License" )
        { lns = app.ReadFile( "ReadME/License.txt" );
           app.Alert( lns ); }
     else if( item.slice(2) =="About me" )
        { abt = app.ReadFile( "ReadME/AboutME.txt" );
           app.Alert( abt ); } 
    
}



//////////////////CHANGE PASSWORD///////////////////

//Called when user touches our button.
function ChangePassword()
{
    //Create dialog window.
    dlgCngPass = app.CreateDialog( );
    dlgCngPass.SetSize( 1.0, 1.0 );
    
    
    //Create a layout for dialog.
    layCngPass = app.CreateLayout( "linear", "vertical,FillXY" );
    layCngPass.SetPadding( 0.02, 0, 0.02, 0.02 );
    dlgCngPass.AddLayout( layCngPass );
    
    //Create some text.
    txtCurrEnter = app.CreateText( "Enter current password:" );
    txtCurrEnter.SetTextSize( 22 );
    txtCurrEnter.SetMargins( 0.01, 0.2, 0.01, 0.01 );
    layCngPass.AddChild( txtCurrEnter );

  edtCurrEnter = app.CreateTextEdit( "", 0.8, -1.0, "Password");
  //edtCurrEnter.SetOnChange( edtEnter_OnChange );
  edtCurrEnter.SetHint( "Current Password" );
  edtCurrEnter.SetOnEnter( currPass_OnEnter );
  layCngPass.AddChild( edtCurrEnter );
  
    //Create some text.
    txtNewEnter = app.CreateText( "Enter new password:" );
    txtNewEnter.SetTextSize( 22 );
    txtNewEnter.SetMargins( 0.01, 0.1, 0.01, 0.01 );
    layCngPass.AddChild( txtNewEnter );

  edtNewEnter = app.CreateTextEdit( "", 0.8, -1.0, "SingleLine");
  edtNewEnter.SetHint( "At least 6 digits" );
  edtNewEnter.SetEnabled( false );
  edtNewEnter.SetOnChange( edtNewEnter_OnChange );
  edtNewEnter.SetOnEnter( edtNew_OnEnter );
  layCngPass.AddChild( edtNewEnter );
  
  //Create some text.
    txtAgnEnter = app.CreateText( "Enter the password again:" );
    txtAgnEnter.SetTextSize( 22 );
    txtAgnEnter.SetMargins( 0.01, 0.01, 0.01, 0.01 );
    layCngPass.AddChild( txtAgnEnter );

  edtAgnEnter = app.CreateTextEdit( "", 0.8, -1.0, "Password");
  edtAgnEnter.SetHint( "Enter again" );
  edtAgnEnter.SetEnabled( false );
  edtAgnEnter.SetOnEnter( edtAgn_OnEnter );
  //edtNewEnter.SetOnChange( edtNewEnter_OnChange );
  layCngPass.AddChild( edtAgnEnter );


    
    //Show dialog.
    dlgCngPass.Show();
}


function currPass_OnEnter()
{
   currPass = app.LoadText( "MyPass", "1234" );
   
   if( currPass == edtCurrEnter.GetText() ) 
      { 
         edtCurrEnter.SetEnabled( false ); 
         edtNewEnter.SetEnabled( true );
      }
   else app.ShowPopup( "Wrong password", "Short" );
}

function edtNewEnter_OnChange()
{
   edtAgnEnter.SetText( "" );
   edtAgnEnter.SetEnabled( false );
}

function edtNew_OnEnter()
{
   if ( edtNewEnter.GetText().length < 6 ) app.ShowPopup( "Enter at least 6 digit", "Short" );
   else { edtAgnEnter.SetEnabled( true); edtAgnEnter.Focus();} 
}

function edtAgn_OnEnter()
{
   if( edtAgnEnter.GetText() == edtNewEnter.GetText() )
      {  app.SaveText( "MyPass", edtAgnEnter.GetText() );
         app.ShowPopup( "Password Changed", "Short" );
         dlgCngPass.Dismiss(); }
   else { edtAgnEnter.SetText( "" ); app.ShowPopup( "Not matched", "Short" ); }
}
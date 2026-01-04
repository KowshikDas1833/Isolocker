//Called when user touches our button.
function text_editor()
{
    //Create dialog window.
    dlg_TxtEdt = app.CreateDialog(null, "NoCancel" );
    dlg_TxtEdt.SetSize( -1, -1 );
    dlg_TxtEdt.SetOnBack( TxtEdt_OnClose );
    
    //Create a layout for dialog.
    lay_TxtEdt = app.CreateLayout( "linear", "vertical,fillxy,left" );
    lay_TxtEdt.SetBackColor( "#222222" );
    dlg_TxtEdt.AddLayout( lay_TxtEdt );
    
    
    //Create a horizontal layout for icon buttons. 
    lay_TxtEdtBut = app.CreateLayout("linear", "Horizontal");
    lay_TxtEdtBut.SetBackColor( "#000000" );
    lay_TxtEdt.AddChild( lay_TxtEdtBut ); 
    
    //Create an array of icon buttons. 
    var TxtEdt_TxtEdt_btns = ["[fa-undo]","[fa-repeat]","[fa-search]","[fa-save]","[fa-close]"];
    for( var i=0; i<TxtEdt_TxtEdt_btns.length; i++ )
    {
        TxtEdt_btn = app.CreateButton( TxtEdt_TxtEdt_btns[i], -1, 0.06, "Custom,FontAwesome" ); 
        TxtEdt_btn.icon = TxtEdt_TxtEdt_btns[i];
        TxtEdt_btn.SetTextSize( 22 );
        TxtEdt_btn.SetMargins( 0.02, 0.0, 0.02, 0.0 );
        TxtEdt_btn.SetOnTouch( TxtEdt_btns_OnTouch ); 
        TxtEdt_btn.SetStyle( "#000000", "#000000" , 0);
        lay_TxtEdtBut.AddChild( TxtEdt_btn ); 
    }
    
     

    //Show dialog.
    dlg_TxtEdt.Show();
    
  layTxtSearch = app.CreateLayout( "Linear", "Vertical" );
  layTxtSearch.SetBackColor( "#000000" );
  layTxtSearch.SetSize( 1.0, -1.0 );
  lay_TxtEdt.AddChild( layTxtSearch );
  layTxtSearch.Gone();
  
    //Create a horizontal layout for icon buttons. 
    lay_SrcFor = app.CreateLayout("linear", "Horizontal");
    layTxtSearch.AddChild( lay_SrcFor );
   
  
	  //Create an text edit box for entering commands.
    edtSrc = app.CreateTextEdit( "", 0.65, -1, "SingleLine" );
    edtSrc.SetHint( "Search for" );
    lay_SrcFor.AddChild( edtSrc );
    
    //Create a button.
    srcDownBtn = app.CreateButton( "[fa-arrow-down]", -1, 0.06, "Custom,FontAwesome"  );
    //srcUpBtn.SetMargins( 0.42, 0.0, 0, 0 );
    srcDownBtn.SetStyle( "#000000", "#000000" , 0);
    srcDownBtn.SetTextSize( 18 );
    srcDownBtn.SetOnTouch( srcDownBtn_OnTouch );
    lay_SrcFor.AddChild( srcDownBtn );
    
    //Create a button.
    srcUpBtn = app.CreateButton( "[fa-arrow-up]", -1, 0.06, "Custom,FontAwesome"  );
    //srcUpBtn.SetMargins( 0.42, 0.0, 0, 0 );
    srcUpBtn.SetStyle( "#000000", "#000000" , 0);
    srcUpBtn.SetTextSize( 18 );
    srcUpBtn.SetOnTouch( srcUpBtn_OnTouch );
    lay_SrcFor.AddChild( srcUpBtn );
    
    /////////////
    
    //Create a horizontal layout for icon buttons. 
    lay_Rplc = app.CreateLayout("linear", "Horizontal");
    layTxtSearch.AddChild( lay_Rplc );
   
  
	  //Create an text edit box for entering commands.
    edtRplc = app.CreateTextEdit( "", 0.65, -1, "SingleLine" );
    edtRplc.SetHint( "Replace with" );
    lay_Rplc.AddChild( edtRplc );
    
    //Create a button.
    replaceBtn = app.CreateButton( "[fa-exchange]", -1, 0.06, "Custom,FontAwesome"  );
    //srcUpBtn.SetMargins( 0.42, 0.0, 0, 0 );
    replaceBtn.SetStyle( "#000000", "#000000" , 0);
    replaceBtn.SetTextSize( 18 );
    replaceBtn.SetOnTouch( replaceBtn_OnTouch );
    lay_Rplc.AddChild( replaceBtn );
    
    //Create a button.
    replaceAllBtn = app.CreateButton( "[fa-arrows-alt]", -1, 0.06, "Custom,FontAwesome"  );
    //srcUpBtn.SetMargins( 0.42, 0.0, 0, 0 );
    replaceAllBtn.SetStyle( "#000000", "#000000" , 0);
    replaceAllBtn.SetTextSize( 18 );
    replaceAllBtn.SetOnTouch( replaceAllBtn_OnTouch );
    lay_Rplc.AddChild( replaceAllBtn );
    
    txtFile = app.ReadFile( directory  );
    
    
   //Create a full screen scroller
    txt_scroll = app.CreateScroller( 1.0, -1.0 );
    lay_TxtEdt.AddChild( txt_scroll );
 
    //Create a layout inside scroller.
    layTxtScroll = app.CreateLayout( "Linear" );
    txt_scroll.AddChild( layTxtScroll );
    
    //Create an txtEdit control.
    txtEdit = app.CreateTextEdit( txtFile, 1, -1, "" ); 
    txtEdit.SetBackColor( "#222222" );
    txtEdit.SetTextColor( "#ffffff" );
    //txtEdit.SetSelection( 5, 9 );
    layTxtScroll.AddChild( txtEdit ); 
    
  
   
	
}


//Handle button presses.
function TxtEdt_btns_OnTouch()
{
    switch( this.icon )
    {
        case "[fa-undo]": txtEdit.Undo(); break;
        case "[fa-repeat]": txtEdit.Redo(); break;
        case "[fa-search]": search(); break;
        case "[fa-close]": TxtEdt_OnClose(); break;
        case "[fa-save]": 
                   { app.WriteFile( directory+"/"+fileName, txtEdit.GetText() ); 
                      app.ShowPopup( "Saved" );
                      lst.RemoveAll();
                      OnList();  }
                   break;
    }
}


function search()
{ 
  if( layTxtSearch.IsVisible() ) layTxtSearch.Gone();
  else layTxtSearch.Show();
}

function srcDownBtn_OnTouch()
{
  edtTxt = txtEdit.GetText();
  
  searchTxt = edtSrc.GetText();
  edtTxtRmn = edtTxt.substring( rmnNdx, edtTxt.length );
  //app.ShowPopup( rmnNdx );
  
  
  if( edtTxt.search( searchTxt ) != -1 )
     {  //Issue: (edtTxtRmn.indexOf( searchTxt )) + rmnNdx
        // dont work together unless, SetSelection( startNdx+rmnNdx....
        // reason is unclear...
       startNdx = edtTxtRmn.indexOf( searchTxt ); 
       if( startNdx == -1 )  { startNdx = edtTxt.indexOf( searchTxt ); rmnNdx = 0; }
       stopNdx = startNdx + searchTxt.length + rmnNdx;
       //app.ShowPopup( startNdx+"   "+stopNdx );
       txtEdit.SetSelection( startNdx+rmnNdx, stopNdx  ); 
       rmnNdx = stopNdx;
     }
  else app.ShowPopup( "No result found" );
}


function srcUpBtn_OnTouch()
{
  edtTxt = txtEdit.GetText();
  searchTxt = edtSrc.GetText();
  edtTxtRmn = edtTxt.substring( 0, rmnNdx-searchTxt.length );
  //app.ShowPopup( edtTxtRmn  );
  
  if( edtTxt.search( searchTxt ) != -1 )
     {
       startNdx = edtTxtRmn.lastIndexOf( searchTxt );
       if( startNdx == -1 )  startNdx = edtTxt.lastIndexOf( searchTxt );
       stopNdx = (startNdx + searchTxt.length);
       //app.ShowPopup( startNdx+"   "+stopNdx );
       txtEdit.SetSelection( startNdx, stopNdx  );
       rmnNdx = stopNdx;
     }
  else app.ShowPopup( "No result found" );
}



function replaceBtn_OnTouch()
{
  startRplc = txtEdit.GetSelectionStart();
  endRplc = txtEdit.GetSelectionEnd();
  txtEdit.ReplaceText( edtRplc.GetText(), startRplc, endRplc  );
}

function replaceAllBtn_OnTouch()
{
  currTxt = txtEdit.GetText();
  srcTxt = edtSrc.GetText();
  if( currTxt.search( srcTxt ) == -1 ) app.ShowPopup( "No result found"  );
  newTxt = currTxt.replace( new RegExp(srcTxt, "g"), edtRplc.GetText() );
  txtEdit.SetText( newTxt );
}


function TxtEdt_OnClose()
{
  TxtEdt_Close = app.CreateYesNoDialog( "Do you want to save changes before close?"  );
  TxtEdt_Close.SetOnTouch( TxtEdt_Close_OnTouch );
  TxtEdt_Close.Show();
}

function TxtEdt_Close_OnTouch( result )
{
   if( result =="Yes" )
      {  app.WriteFile( directory+"/"+fileName, txtEdit.GetText() ); 
         app.ShowPopup( "Saved" );
         lst.RemoveAll();
         OnList();
         dlg_TxtEdt.Dismiss(); }
   else dlg_TxtEdt.Dismiss();
}
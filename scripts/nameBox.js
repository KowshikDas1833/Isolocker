function nameBox( typ )
{
    if( typ == "nFldr" ) { nameBox_title = "Enter new folder name"; nameFl = ""; }
    else if( typ == "Rename" ) { nameBox_title = "Rename"; nameFl = fileName; }
   
   //Create dialog window.
    nameBox_dlg = app.CreateDialog( nameBox_title  );
    nameBox_dlg.SetBackColor( "#a0000000" );
 
    //Create a layout for dialog.
    layNameDlg = app.CreateLayout( "linear", "vertical,fillxy" );
    //layNameDlg.SetPadding( 0.02, 0, 0.02, 0.02 );
    layNameDlg.SetBackColor( "#a0000000" );
    layNameDlg.SetSize( 0.8, 0.12 );
    nameBox_dlg.AddLayout( layNameDlg );
    
    //Create an text edit box for Name name.
    edtName = app.CreateTextEdit( nameFl, 0.78, -1.00, "SingleLine");
    //edtName.SetHint( "Name" );
    layNameDlg.AddChild( edtName );
    
    //Create a horizontal layout for icon buttons. 
    layName_btn = app.CreateLayout("Linear", "Horizontal"); 
    layName_btn.SetMargins( 0.0, 0.0, 0.0, 0.0 );
    layNameDlg.AddChild( layName_btn ); 
    
    fBtnCan = app.CreateButton( "Cancel", 0.4, 0.07, "Custom" );
	  fBtnCan.SetMargins( 0, 0.0, 0, 0 );
	  fBtnCan.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
	  fBtnCan.SetBackColor( "#00000000" );
	  fBtnCan.SetOnTouch( fBtnCan_OnTouch );
	  layName_btn.AddChild( fBtnCan );
	  
	  fBtnOk = app.CreateButton( "Ok", 0.4, 0.07, "Custom" );
	  fBtnOk.SetMargins( 0, 0.0, 0, 0 );
	  fBtnOk.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
	  fBtnOk.SetBackColor( "#00000000" );
	  fBtnOk.SetOnTouch( fBtnOk_OnTouch );
	  layName_btn.AddChild( fBtnOk );
    
    //Show dialog.
    nameBox_dlg.Show();
}


function fBtnCan_OnTouch()
{
   nameBox_dlg.Dismiss();
}

function fBtnOk_OnTouch()
{ 
  //????? Condition required to avoid not allowed syntex. * /\ " : , ? | <>
  fldrnmTxt = edtName.GetText();
  
  wrnMsg = "The name could not contain the char * /\  : , ? | <> ''" ;
  if( fldrnmTxt.indexOf( "*" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "*" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "/" ) > -1 || fldrnmTxt.indexOf( "'\'" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( '"' ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( ":" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "," ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "?" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "|" ) > -1 ) app.ShowPopup( wrnMsg  );
  else if( fldrnmTxt.indexOf( "<" ) > -1 || fldrnmTxt.indexOf( ">" ) > -1 ) app.ShowPopup( wrnMsg  );
  else {
              if( typ == "nFldr" ) 
                 { 
                     app.MakeFolder( directory + "/" + fldrnmTxt );
                  }
              else if( typ == "Rename" ) 
                  { //app.ShowPopup( directory + "/" + fileName); 
                       if( app.IsFolder( directory + "/" + fileName ) )  app.RenameFolder( directory + "/" + fileName, directory + "/" + fldrnmTxt );
                       else app.RenameFile( directory + "/" + fileName, directory + "/" + fldrnmTxt  );
                  }
              lst.RemoveAll();
              OnList();
              nameBox_dlg.Dismiss();
           }

}
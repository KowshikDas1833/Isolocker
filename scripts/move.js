var Typ;


function move_fldr( mvTyp )
{
  Typ = mvTyp;
  
  dlgMove = app.CreateDialog( mvTyp );
  dlgMove.SetBackColor( "#000000" );

  laydlgMove = app.CreateLayout( "linear", "Top,Center,FillXY" );
  laydlgMove.SetSize( 1.0, 1.0 );
  laydlgMove.SetBackColor( "#000000" );
  dlgMove.AddLayout( laydlgMove );

  //Create a horizontal layout for icon buttons. 
    layMoveBut = app.CreateLayout("Linear", "Horizontal"); 
    laydlgMove.AddChild( layMoveBut ); 
    
  //Create a button 1/3 of screen width and 1/10 screen height.
	btn_Cancel = app.CreateButton( "Cancel", 0.3, -1.0, "Custom" );
	btn_Cancel.SetMargins( 0.4, 0.0, 0, 0 );
	btn_Cancel.SetTextSize( 16 );
	btn_Cancel.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
  btn_Cancel.SetBackColor( "#00000000" );
  btn_Cancel.SetOnTouch( btn_Cancel_OnTouch );
	layMoveBut.AddChild( btn_Cancel );
	
	 //Create a button 1/3 of screen width and 1/10 screen height.
	btn_Move = app.CreateButton( "Move here", 0.3, -1.0, "Custom" );
	btn_Move.SetMargins( 0, 0.0, 0, 0 );
	btn_Move.SetTextSize( 16 );
	btn_Move.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
  btn_Move.SetBackColor( "#00000000" );
  btn_Move.SetOnTouch( btn_Move_OnTouch );
	layMoveBut.AddChild( btn_Move );
	
  //var move_list =  app.ListFolder( "/sdcard" );
  move_lst = app.CreateList( "", 1.0, 0.75 );
  move_lst.SetOnTouch( move_lst_OnTouch );
  laydlgMove.AddChild( move_lst );
  
  //Create a button 1/3 of screen width and 1/10 screen height.
	btn_Back = app.CreateButton( "[fa-arrow-left]"+" Back", 0.3, -1.0, "FontAwesome,Custom" );
	btn_Back.SetMargins( 0.35, 0.0, 0, 0 );
	btn_Back.SetTextSize( 16 );
	btn_Back.SetStyle( "#9900afff", "#9900afff", 0, "#00000000", 0, 0);
  btn_Back.SetBackColor( "#00000000" );
  btn_Back.SetOnTouch( btn_Back_OnTouch );
	laydlgMove.AddChild( btn_Back );
	
	//if( mvTyp == "Move" ) { app.ShowPopup( mvTyp ); }
	if( mvTyp == "Attach Folder" ) 
	           { btn_Move.Gone(); 
	             btn_Cancel.SetMargins( 0.7, 0.0, 0, 0 ); 
	             move_lst.SetOnLongTouch( move_lst_OnLongTouch );
	             app.ShowPopup( "Long press on item to select" ); }
	//else if( mvTyp == "Move to local storage" ) { app.ShowPopup( mvTyp ); }

  dlgMove.Show();
  app.ShowProgress( "Loading..." );
  OnMoveList();
}


function OnMoveList()
{ 
      
 move_Items = app.ListFolder(movePath);//.toString().split(","); 

for ( i=0; i<move_Items.length; i++) 
  { 
       if( app.IsFolder( movePath + "/" + move_Items[i] )) 
                {
                       if( move_Items[i] == "" ) { move_lst.RemoveAll(); }
                       else {  move_lst.AddItem( move_Items[i], null, "Folder");  }
   } 
       else 
                 {   null;  }
   }

app.HideProgress();
if (movePath == storage || movePath == main_directory) btn_Back.SetEnabled( false );
else btn_Back.SetEnabled( true );

}


function move_lst_OnTouch( title, body, type, index )
{
  movePath = movePath + "/" + title 
  
  if(app.IsFolder( movePath ) )
          { 
                 move_folder = title;
                 prev_mvFolder = title;
                 move_lst.RemoveAll();
                 app.ShowProgress( "Loading..." );
                 OnMoveList();  
           }
  
  else 
           {  null; }
}


function btn_Back_OnTouch()
{
                 movePath = movePath.replace( "/" + move_folder, "" );
                 index_of_folder = movePath.lastIndexOf( "/" );
                 move_folder = movePath.substring( index_of_folder+1, movePath.length);
                 move_lst.RemoveAll();
                 app.ShowProgress( "Loading..." );
                 OnMoveList();
                 move_lst.ScrollToItem( prev_mvFolder );
}


function btn_Cancel_OnTouch()
{
  dlgMove.Dismiss();
}

function btn_Move_OnTouch()
{
   //app.ShowPopup( app.LoadBoolean( "delFromStorage", true ) );
   if( app.IsFolder(directory + "/" + fileName )) 
         { app.CopyFolder( directory + "/" + fileName, movePath+ "/" + fileName  );
            if (  app.FolderExists( movePath+ "/" + fileName ) ) 
	                 {    app.ShowPopup( fileName +" Moved"  );
	                      if( Typ == "Move" )//|| app.LoadBoolean( "delFromStorage", true ) || 
	                          {   app.DeleteFolder( directory + "/" + fileName  ); 
	                              lst.RemoveItem( fileName ); }
	                     
	                      else if( Typ == "Move to local storage" && app.LoadBoolean( "delFromDeepCase", false )  )
	                              {   app.DeleteFolder( directory + "/" + fileName  ); 
	                                   lst.RemoveItem( fileName ); }
	                  }
	           else app.ShowPopup( "Failed" );
         }
   else { 
              app.CopyFile( directory + "/" + fileName, movePath+ "/" + fileName  );
              if (  app.FileExists( movePath+ "/" + fileName ) ) 
	                      {   app.ShowPopup( fileName +" Moved"  );
	                           if( Typ == "Move" )
	                                  {   app.DeleteFile( directory + "/" + fileName  ); 
	                                       lst.RemoveItem( fileName ); } 
	                       
	                           else if( Typ == "Move to local storage" && app.LoadBoolean( "delFromDeepCase", false )  )
	                                     {   app.DeleteFile( directory + "/" + fileName  ); 
	                                       lst.RemoveItem( fileName ); } 
	                               
	                       }
	            else app.ShowPopup( "Failed" );
            }

   dlgMove.Dismiss();
   
}


function move_lst_OnLongTouch( title, body, type, index )
{
  mvOutFldr = title;
  mvYsn = app.CreateYesNoDialog( "Move "+title+" to DeepCase?" );
  mvYsn.SetOnTouch( mvYsn_OnTouch );
  mvYsn.Show();
}

function mvYsn_OnTouch( result )
{
  if( result =="Yes" ) 
      { //app.ShowPopup( movePath+"/"+mvOutFldr );
         app.CopyFolder( movePath+"/"+mvOutFldr, directory+"/"+mvOutFldr,  );
         mvYsn.Dismiss();
         dlgMove.Dismiss();
         lst.AddItem( mvOutFldr, app.ListFolder( directory+"/"+mvOutFldr ).length+" item", "Folder" );
         app.ShowPopup( mvOutFldr +" Moved"  );
                      if( app.IsFolder( directory+"/"+mvOutFldr ) &&  app.LoadBoolean( "delFromStorage", true ) )
	                           {    app.DeleteFolder( movePath+"/"+mvOutFldr  );  }
         
         
       }
}
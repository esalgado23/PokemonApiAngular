import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokemonGridComponent } from './pokemon-grid/pokemon-grid.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select'; 

import { PokemonService } from './pokemon.service';
import { PokemonTypeNamesPipe } from './pipes/pokemon-type-names.pipe'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonGridComponent,
    PokemonTypeNamesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

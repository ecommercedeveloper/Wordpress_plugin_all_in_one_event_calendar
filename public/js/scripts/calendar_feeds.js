timely.define(["jquery_timely","domReady","scripts/calendar_feeds/ics/ics_event_handlers","libs/select2_multiselect_helper","libs/tags_select","libs/utils","ai1ec_config","libs/gmaps","external_libs/jquery_cookie","external_libs/bootstrap/tab","external_libs/bootstrap/alert","external_libs/bootstrap/modal","external_libs/bootstrap/button","external_libs/bootstrap/collapse","scripts/add_new_event/event_location/input_coordinates_utility_functions","external_libs/jquery.autocomplete_geomod","external_libs/geo_autocomplete"],function(e,t,n,r,i,s,o,u){var a=function(){var t=e(this.hash);r.refresh(t),i.refresh(t)},f=function(t){var n=e(this).attr("href");e.cookie("feeds_active_tab",n),"#suggested"===n&&g()},l=function(){var t=e("#ai1ec-feeds-after"),s=e(".ai1ec_submit_wrapper"),l=e(".ai1ec_file_upload_tags_categories");r.init(t),i.init(t),r.init(s),i.init(s),r.init(l),i.init(l),e("ul.ai1ec-nav a").on("click",f),e("ul.ai1ec-nav a").on("shown",a),e('select[name="cron_freq"]').on("change",function(){e.ajax({url:ajaxurl,type:"POST",data:{action:"ai1ec_feeds_page_post",cron_freq:this.value}})}),e("#ai1ec-ics-modal").on("click",".remove, .keep",n.submit_delete_modal),e(document).on("click","#ai1ec_add_new_ics",n.add_new_feed).on("click",".ai1ec_delete_ics",n.open_delete_modal).on("click",".ai1ec_update_ics",n.update_feed).on("click",".ai1ec_edit_ics",n.edit_feed).on("click","#ai1ec_cancel_ics",n.edit_cancel).on("click",".ai1ec-panel-heading > a",n.edit_cancel).on("click",'.ai1ec-feed-container .ai1ec-panel-heading a, .ai1ec-nav-tabs a[href="#import"]',n.edit_cancel),e(document).on("click",".ai1ec-suggested-import-event",function(){var t=e(this),n=t.closest(".ai1ec-suggested-event-import"),r=e.parseJSON(t.closest(".ai1ec-infowindow, tr").attr("data-event"));return e("a.ai1ec-suggested-processing",n).removeClass("ai1ec-hidden"),t.addClass("ai1ec-hidden"),e.ajax({url:o.ajax_url,type:"POST",data:{action:"ai1ec_import_suggested_event",ai1ec_feed_url:r.url,ai1ec_feed_id:r.feed_id,ai1ec_event_id:r.id},success:function(t){e("a.ai1ec-suggested-processing",n).addClass("ai1ec-hidden"),t.error?(e("a.ai1ec-suggested-import-event",n).removeClass("ai1ec-hidden"),e("#ai1ec-discovery-status").addClass("ai1ec-error").text(o.discovery_event_error).hide().fadeIn()):(e("a.ai1ec-suggested-remove-event",n).removeClass("ai1ec-hidden"),e("#ai1ec-discovery-status").removeClass("ai1ec-error").text(o.discovery_event_success).hide().fadeIn())},error:function(){e("a.ai1ec-suggested-processing",n).addClass("ai1ec-hidden"),e("a.ai1ec-suggested-import-event",n).removeClass("ai1ec-hidden"),e("#ai1ec-discovery-status").addClass("ai1ec-error").text(o.discovery_event_error).hide().fadeIn()}}),!1}),e(document).on("click",".ai1ec-suggested-remove-event",function(){var t=e(this),n=t.closest(".ai1ec-suggested-event-import, .ai1ec-myfeeds-event"),r=t.closest(".ai1ec-infowindow, tr"),i=t.closest(".ai1ec-myfeeds-event"),s=r.length?e.parseJSON(r.attr("data-event")):null,u=s?s.id:i.attr("data-event-id"),a=s?s.feed_id:i.attr("data-feed-id");return e("a.ai1ec-suggested-removing",n).removeClass("ai1ec-hidden"),t.addClass("ai1ec-hidden"),i.addClass("ai1ec-myfeeds-removing"),e.ajax({url:o.ajax_url,type:"POST",data:{action:"ai1ec_remove_suggested_event",ai1ec_event_id:u,ai1ec_feed_id:a,ai1ec_delete:!0},success:function(t){e("a.ai1ec-suggested-removing",n).addClass("ai1ec-hidden"),e("a.ai1ec-suggested-import-event",n).removeClass("ai1ec-hidden"),i.length&&!i.closest(".ai1ec-feed-category").find(".ai1ec-myfeeds-event").not(".ai1ec-myfeeds-removing").length&&i.closest(".ai1ec-feed-container").remove(),i.remove()},error:function(){e("a.ai1ec-suggested-removing",n).addClass("ai1ec-hidden"),e("a.ai1ec-suggested-remove-event",n).removeClass("ai1ec-hidden")}}),!1}),e(document).on("click",".ai1ec-suggested-view-selector > a",function(){var t=e(this),n=t.parent(),r=t.attr("data-ai1ec-view");return e("#suggested").removeClass(function(e,t){return(t.match(/(^|\s)ai1ec-feeds-\S+/g)||[]).join(" ")}).addClass("ai1ec-feeds-"+r),n.find("a.ai1ec-active").removeClass("ai1ec-active"),t.addClass("ai1ec-active").blur(),e("[data-ai1ec-show]").hide().filter('[data-ai1ec-show~="'+r+'"]').show(),"list"!==r&&u(function(){d(!0)}),!1}),e(document).on("click","a.ai1ec-suggested-title",function(){var t=e(this),n=t.closest("tr"),r=e.parseJSON(n.attr("data-event"));if(n.hasClass("ai1ec-suggested-hover"))e("#ai1ec_events_map_canvas").removeClass("goes-left"),n.removeClass("ai1ec-suggested-hover");else{e(".ai1ec-suggested-hover").removeClass("ai1ec-suggested-hover"),n.addClass("ai1ec-suggested-hover"),e("#ai1ec_events_map_canvas").addClass("goes-left");var i=e("#ai1ec_events_extra_details").html("");r.image_url&&i.append(e("<img />",{src:r.image_url,alt:""})),i.append(e('<a href="#" class="ai1ec-btn ai1ec-btn-primary ai1ec-btn-sm 						ai1ec-open-event" target="_blank">						<i class="ai1ec-fa ai1ec-fa-external-link ai1ec-fa-xs ai1ec-fa-fw"></i>						Open</a>')).append(e('<div class="ai1ec-extra-title"></div>').text(r.title)).append(e('<div class="ai1ec-extra-date"></div>').text(r.dtstart)).append(e('<div class="ai1ec-extra-venue"></div>').text(r.venue_name)).append(e('<div class="ai1ec-extra-location"></div>').text(r.location)).append(e('<div class="ai1ec-extra-description"></div>').text(e("<div />").html(r.description).text()))}return t.blur(),!1}),e(document).on("click",".ai1ec-feeds-list-container a.page-numbers",function(){var t=this.href.match(/pagenum=(\d+)/);return t&&1<t.length&&(t=t[1],e(".ai1ec-suggested-events").addClass("ai1ec-feeds-loading"),m({page:t})),!1}),e("#ai1ec_suggested_search").on("click",function(){return e("#ai1ec_events_map_canvas").removeClass("goes-left"),e("tr.ai1ec-suggested-hover a.ai1ec-suggested-title").click(),m(),!1}),e("#ai1ec_suggested_term").on("keydown change",function(){e(this).removeClass("ai1ec-error")})},c,h=[],p,d=function(t){var n={mapTypeId:google.maps.MapTypeId.ROADMAP,mapTypeControl:!0,zoomControl:!0,scaleControl:!0},r=null,i=null,s=e(".ai1ec-suggested-events-actions-template").html(),o=new google.maps.InfoWindow({maxWidth:260}),u=function(e){var t='<div class="ai1ec-infowindow" data-event-id="'+e.id+'"><div class="ai1ec-infowindow-title"><b>'+e.title+"</b></div>"+e.dtstart.substr(0,10)+" @ "+e.venue_name+"<br>"+s+"</div>";o.setContent(t)},a=!t;p=function(){var t=[];for(var n=0;n<h.length;n++)e('tr[data-event-id="'+h[n].event_id+'"]').length?t.push(h[n].event_id):(h[n].setMap(null),h[n]=null);e("tr.ai1ec-suggested-event").each(function(){var n=e(this),r=e.parseJSON(n.attr("data-event"));if(!r||!r.latitude||!r.longitude)return;if(-1!=e.inArray(t,r.id))return;var i=new google.maps.Marker({map:c,title:r.title,position:new google.maps.LatLng(r.latitude,r.longitude)});i.event_id=r.id,i.addListener("click",function(){u(r),o.open(c,this)}),i.addListener("mouseover",function(){e('tr[data-event-id="'+this.event_id+'"]').addClass("ai1ec-suggested-hover")}),i.addListener("mouseout",function(){e('tr[data-event-id="'+this.event_id+'"]').removeClass("ai1ec-suggested-hover")}),h.push(i)}),h=h.filter(function(e){return e!==null})},t&&(c=new google.maps.Map(e("#ai1ec_events_map_canvas").get(0),n)),p(),v(t);var f=function(t,n){if("zoom_changed"===t&&!n)return a=!0,!1;clearTimeout(r),i&&4!=i.readystate&&(i.abort(),i=null,e(".ai1ec-suggested-events").removeClass("ai1ec-feeds-loading")),r=setTimeout(function(){var n=c.getCenter(),r=n.lat(),s=n.lng(),o=c.getBounds();e(".ai1ec-suggested-events").addClass("ai1ec-feeds-loading"),i=m({lat:r,lng:s,radius:b(r,s,o.getNorthEast().lat(),o.getNorthEast().lng(),o.getSouthWest().lat(),o.getSouthWest().lng())},p,t)},1e3)};t&&(c.addListener("dragend",function(){f("dragend",!0)},!1),c.addListener("zoom_changed",function(){f("zoom_changed",a)},!1))},v=function(t){if(!h.length||!t)return;var n=new google.maps.LatLngBounds,r=parseFloat(e("#ai1ec_suggested_lat").val()),i=parseFloat(e("#ai1ec_suggested_lng").val()),s=parseFloat(e("#ai1ec_suggested_radius").val());for(var o=0;o<h.length;o++)n.extend(h[o].getPosition());c.fitBounds(n),new google.maps.Circle({center:new google.maps.LatLng(r,i),fillOpacity:.05,strokeOpacity:.3,strokeWeight:1,map:c,radius:s*1e3})},m=function(t,n,r){return e("#ai1ec_suggested_term").removeClass("ai1ec-error"),t=e.extend({action:"ai1ec_search_events",term:e.trim(e("#ai1ec_suggested_term").val()),location:e.trim(e("#ai1ec_suggested_location").val()),lat:e("#ai1ec_suggested_lat").val(),lng:e("#ai1ec_suggested_lng").val(),radius:e("#ai1ec_suggested_radius").val()},t),e.ajax({url:o.ajax_url,type:"POST",data:t,success:function(i){i=e.parseJSON(i);if(!i)return;i.total?(e("#suggested").addClass("ai1ec-has-map"),e(".ai1ec-suggested-results").show(),e(".ai1ec-suggested-no-results").hide(),e(".ai1ec-feeds-list-container").html(i.list),e(".ai1ec-suggested-results-found").text(i.total),u(function(){d(!t||!n)}),e(".ai1ec-feeds-list-container tr.ai1ec-suggested-event").each(function(){var t=e(this),n=e.parseJSON(t.attr("data-event"));for(var r=0;r<i.imported.length;r++)if(i.imported[r].feed_id==n.feed_id&&i.imported[r].feed_events_uids[n.id]){e(".ai1ec-suggested-remove-event",t).removeClass("ai1ec-hidden"),e(".ai1ec-suggested-import-event",t).addClass("ai1ec-hidden");break}})):(e(".ai1ec-suggested-results-found").text("0"),r||(e("#suggested").removeClass("ai1ec-has-map"),e(".ai1ec-suggested-results").hide(),e(".ai1ec-suggested-no-results").show()),e(".ai1ec-feeds-list-container").html("")),n&&n.apply()}})},g=function(){setTimeout(function(){u(function(){d(!0)})},0)},y=function(){var t=e("#ai1ec_suggested_location"),n=e("#ai1ec_suggested_radius"),r=e("#ai1ec_suggested_lat"),i=e("#ai1ec_suggested_lng"),s=function(){n.val(""),r.val(""),i.val("")};e("#ai1ec_suggested_location").on("change",function(){s()}).geo_autocomplete(new google.maps.Geocoder,{selectFirst:!0,minChars:2,cacheLength:100,width:400,scroll:!0,scrollHeight:500,autoFill:!0}).result(function(e,o){if(o&&o.geometry&&o.formatted_address){var u=o.formatted_address,a=o.geometry.location.lat(),f=o.geometry.location.lng(),l=o.geometry.viewport;t.val(u),n.val(b(a,f,l.getNorthEast().lat(),l.getNorthEast().lng(),l.getSouthWest().lat(),l.getSouthWest().lng())),r.val(a),i.val(f)}else s()})},b=function(e,t,n,r,i,s){var o=n-i,u=r-s,a=o/.009,f=u/.009/Math.cos(e*Math.PI/180),l=Math.max(a,f),c=l/2;return c},w=function(){t(function(){s.activate_saved_tab_on_page_load(e.cookie("feeds_active_tab")),l(),u(y)})};return{start:w}});
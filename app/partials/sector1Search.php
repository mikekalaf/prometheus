<div id="appSearch">
  <div class="appNav">
    <?php
      if (!empty($sectorData['prev_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector1.php?page=".$prevPage.$navQuery."'><i class='fa fa-chevron-left'></i></div>";
      }
        echo "<div class='navLabel'>".$sectorData['from']." to ".$sectorData['to']." of ".$sectorData['total']."</div>";
      if (!empty($sectorData['next_page_url'])) {
        echo "<div class='navButton navTrigger' data-url='partials/sector1.php?page=".$nextPage.$navQuery."'><i class='fa fa-chevron-right'></i></div>";
      }
      ?>
  </div>
  <div class="searchWrapper">
    <div class="searchCol leftCol">
      Test
    </div>
    <div class="searchCol rightCol">
      Test
    </div>
  </div>
</div>



<?php $__env->startSection('title'); ?>
About
<?php $__env->stopSection(); ?>

<?php $__env->startSection('link'); ?>
<link rel="stylesheet" href="/css/about.css">
<?php $__env->stopSection(); ?>

<?php $__env->startSection('main'); ?>
<div class="about-panel">
  <div class="about-panel-header">
    <h2>About</h2>
  </div>
  <div class="about-panel-content">
    <h2>概要</h2>
    <p>Simple Typingは気軽に楽しめるシンプルなタイピング練習ゲームです。ぜひここであなたのタイピングスキルを証明してみてください。</p>
    <h2>ルール</h2>
    <p>ゲーム画面に表示された指示に従って単語や文章を入力してください。正しく入力されていれば次の指示が表示されます。なるべく速く、正確に入力してください。<br>※同じ単語が連続して出題される場合もあります。</p>
    <h2>ノーマルモード</h2>
    <p>制限時間内に目標単語数を達成するとステージクリアです。難易度の違う4つのステージがあり、出題される単語の長さが違います。</p>
    <h2>スコアアタック</h2>
    <p>クリア条件は無く、制限時間内にどれだけ多くの単語を入力できるか挑戦できます。</p>
    <h2>サバイバル</h2>
    <p>単語の入力に成功すると残り時間が2秒回復します。なるべく多くの時間を稼いでできるだけ長くプレイし続けましょう。</p>
  </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/about.blade.php ENDPATH**/ ?>